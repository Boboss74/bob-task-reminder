module.exports = {
    env: {
        node: true,
        es2022: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/no-explicit-any': ['warn'],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-unused-vars': ['warn'],
        '@typescript-eslint/promise-function-async': ['error'],
    },
    ignorePatterns: ['dist', '.eslintrc.js'],
};
