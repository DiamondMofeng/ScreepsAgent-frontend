//eslintConfig
module.exports = {
  "extends": [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],


  rules: {

    'no-unused-vars': 'off',  //ts-eslint里面有
    'prefer-const': 'off',
    "no-redeclare": "off",  //ts-eslint里面有
    'no-await-in-loop': 'warn',

    //ts
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    "@typescript-eslint/no-redeclare": ["error", { "ignoreDeclarationMerge": true }],

    //react
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',

  }




}