module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 140,
    tabWidth: 4,
    overrides: [
        {
            files: '(*.yml)|(*.md)',
            options: {
                tabWidth: 2,
            },
        },
    ],
};
