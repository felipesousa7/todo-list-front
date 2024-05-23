import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: parser,
      globals: globals.browser,
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "prettier": pluginPrettier,
      "react": "eslint-plugin-react"
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReactConfig.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
];
