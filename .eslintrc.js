module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "vue"
  ],
  "rules": {
    "semi": [
      2,
      "never"
    ],
    "no-console": "off",
    "no-debugger": "off",
    "vue/max-attributes-per-line": [2, {
      "singleline": 3,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    "prettier/prettier": [
      "error",
      {
        "semi": false,
        "printWidth": 120
      }
    ]
  },
  "globals": {
    "use": true,
    "make": true
  }
}
