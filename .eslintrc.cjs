module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb-typescript",
    "airbnb",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    quotes: "off",
    "import/no-unresolved": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "import/extensions": ["off", "ignorePackages"],
    "import/resolver": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
    "react/react-in-jsx-scope": "off",
    "operator-linebreak": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "error",
    "implicit-arrow-linebreak": ["off", "below"],
    "react/jsx-props-no-spreading": [
      "off",
      {
        html: "ignore",
        custom: "ignore",
        explicitSpread: "ignore",
      },
    ],
    "react/require-default-props": "off",
  },
};
