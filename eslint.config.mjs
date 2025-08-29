import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";
import stylistic from "@stylistic/eslint-plugin";

export default [
    jsdoc.configs["flat/recommended-typescript"],
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: globals.node,
            sourceType: "module",
            ecmaVersion: "latest"
        },
        rules: {
            "@stylistic/indent": ["error", 4],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/arrow-spacing": ["warn", { "before": true, "after": true }],
            "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
            "@stylistic/semi": ["error", "always"],
            "@typescript-eslint/no-explicit-any": "off",
        },
        plugins: {
            "@stylistic": stylistic,
        },
    },
];
