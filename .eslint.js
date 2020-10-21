export default {
    extends: ['airbnb-typescript'],
    rules: {
        indent: ['error', 4],
        strict: 0,
        'no-var': 'error',
        'no-console': 0
    },
    parserOptions: {
        project: './tsconfig.json',
    },
};