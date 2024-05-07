module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true,
    "react-native/react-native": true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "react-native",
    "react-hooks",
    "@typescript-eslint",
    "prettier",
  ],
  rules: {
    "prettier/prettier": "error",
    quotes: ["error", "double", { avoidEscape: true }],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "no-duplicate-imports": "error",
    semi: ["error", "always"],
    "spaced-comment": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "react-native/no-inline-styles": "warn",
    "react-native/no-unused-styles": "warn",
    "react-native/no-color-literals": "warn",
    "react-native/no-single-element-style-arrays": "warn",
    "@typescript-eslint/no-unused-vars": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
    },
  },
};
