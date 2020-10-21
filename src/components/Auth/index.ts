import * as jwt from 'jsonwebtoken';
import AuthService from './service';
import  AuthValidation  from './validation';
import { Request, Response } from 'express';
import ValidTypeReq from '../shared/interfaces/validate-api-input.interfaces';

export async function signIn(req: Request, res: Response){
    const value = AuthValidation.signIn(req.body);
    const user = await AuthService.findUserByEmail(value.email);

    if (!user) return res.status(404).json({ message: 'User is not found', statusCode: 404 });

    const { accessToken, refreshToken } = await AuthService.generateTokens(
        user.id, value.email,
        AuthService.relationIdToRefreshToken,
    );

    return res.status(200).json({ message: 'The user is signed in', data: { accessToken, refreshToken } });
}

export async function currentUser(req: Request, res: Response){
    const authToken = req.header('authorization');
    const token = authToken && authToken.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!user) return res.status(404).json({ message: 'User is not found', statusCode: 404 });

    return res.status(200).json({ message: 'Current data of the user', data: { email: user.email, id: user.id } });
}

export async function refresh(req: Request, res: Response){
    const value = AuthValidation.token(req.body);

    return jwt.verify(value.refreshToken, process.env.REFRESH_TOKEN_SECRET,
        async (err: string, payload: ValidTypeReq) => {
            if (err) return res.sendStatus(403);

            const oldRefreshToken = await AuthService.findRefreshTokenById(payload.id);

            if (oldRefreshToken === null) return res.status(400).json({ message: 'RefreshToken has been expired' });

            const { accessToken, refreshToken } = await (AuthService.generateTokens(
                payload.id, payload.email,
                AuthService.updateExistingUserRefreshToken,
            ));

            return res.status(200).json({ data: { accessToken, refreshToken } });
        });
}

export async function signOut(req: Request, res: Response){
    const value = AuthValidation.signOut(req.body);

    await AuthService.findUserByEmail(value.email);
    await AuthService.deleteRefreshTokenById(value.email.toString());

    return res.status(200).json({ message: 'The user is signed out', data: null });
}

export async function signUp(req: Request, res: Response){
    const user = await AuthService.signUp(req.body);

    return res.status(200).json({ message: 'The user has been created', data: { user } });
}

export async function signOutAll(req: Request, res: Response){
    await AuthService.deleteAllRefreshTokens();

    return res.status(200).json({ message: 'All users have been signed out' });
}

