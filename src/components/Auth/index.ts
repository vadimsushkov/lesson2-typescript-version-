import * as jwt from 'jsonwebtoken';
import AuthService from './service';
import  AuthValidation  from './validation';
import { NextFunction, Request, Response } from 'express';

export async function signIn(req: Request, res: Response, next: NextFunction): Promise < void > {
    const { value, error } = AuthValidation.signIn(req.body);

    if (error) throw error;

    const user = await AuthService.findUserByEmail(value.email);

    if (!user) res.status(404).json({ message: 'User is not found', statusCode: 404 });
    const { accessToken, refreshToken } = await AuthService.generateTokens(
        user.id, value.email,
        AuthService.relationIdToRefreshToken,
    );
    res.header('Authorization', accessToken).status(200).json({ data: { accessToken, refreshToken } });
}

export async function currentUser(req: Request, res: Response, next: NextFunction): Promise < void > {
    const authToken = req.header('authorization');
    const token = authToken && authToken.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!user) res.status(404).json({ message: 'User is not found', statusCode: 404 });
    res.status(200).json({ message: 'Your current data', data: { email: user.email, id: user.id } });
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise < void > {
    const { value, error } = AuthValidation.token(req.body);
    console.log(value);

    if (error) throw error;

    return jwt.verify(value.refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err: any, payload: { id: any; email: any;}) => {
            if (err) return res.sendStatus(403);

            const oldRefreshToken = await AuthService.findRefreshTokenById(payload.id);

            if (oldRefreshToken == null) return res.status(400).json({ message: 'RefreshToken has been expired' });

            const { accessToken, refreshToken } = await (AuthService.generateTokens(
                payload.id, payload.email,
                AuthService.updateExistingUserRefreshToken,
            ));

            return res.status(200).json({ data: { accessToken, refreshToken } });
        });
}

export async function signOut(req: Request, res: Response, next: NextFunction): Promise < void > {
    const { value, error } = AuthValidation.signOut(req.body);
    console.log(req.body);

    if (error) throw error;

    const user = await AuthService.findUserByEmail(value.email);
    console.log(user);
    await AuthService.deleteRefreshTokenById(value.email.toString());

    res.status(200).json({ message: 'You are signed out', data: null });
}

export async function signUp(req: Request, res: Response, next: NextFunction): Promise < void > {
    const { error } = AuthValidation.signUp(req.body);

    if (error) throw error;

    const user = await AuthService.signUp(req.body);

    res.status(200).json({ message: 'User has been created', data: { user } });
}

export async function signOutAll(req: Request, res: Response, next: NextFunction): Promise < void > {
    await AuthService.deleteAllRefreshTokens();

    res.status(200).json({ message: 'All users have been signed out' });
}

