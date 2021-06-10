module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "plugins": [
    "prettier"
  ],
  "globals": {
    document: true,
    window: true,
  },
  "extends": [
    "plugin:prettier/recommended",
    "prettier"
  ],
  "ignorePatterns": ["three.min.js"],
  "rules": {
    "no-console": ["error", { allow: ["warn"] }],
    "semi": [2, "always"],
  }
};
