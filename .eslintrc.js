module.exports = {
  extends: [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  parser: "babel-eslint",
  plugins: [
    "react-native",
    "jest",
    "prettier"
  ],
  rules: {
    "react/no-this-in-sfc": 0,
    "react/forbid-foreign-prop-types": 0,
    "import/prefer-default-export": 0,
    "prettier/prettier": "error",
    "max-len": 0,
    "react/jsx-filename-extension": 0,
    "class-methods-use-this": 0,
    "import/no-extraneous-dependencies": 0,
    "eqeqeq": 0,
    "import/first": 0,
    "prefer-destructuring": 0,
    "default-case": 0,
    "no-useless-constructor": 0,
    "eslint-disable-next-line": 0,
    "react/no-string-refs": 0,
    "no-console": 2,
    "no-use-before-define": 0,
    "global-require": 0,
    "no-underscore-dangle": 0,
    "react/forbid-prop-types": 0,
    "react/sort-comp": 0,
    "no-nested-ternary": 0,
    "no-return-assign": 0,
    "react/no-array-index-key": 0,
    "no-tabs": 0,
    "no-mixed-spaces-and-tabs": 0,
    "react/no-did-mount-set-state": 0,
    "no-mixed-operators": 0,
    "react/prefer-stateless-function": 0,
    "jsx-a11y/href-no-hash": 0,
    "padded-blocks": 0,
    "padding-line-between-statements": 0,
    "new-cap": 0,
    "import/no-unresolved": [2, {
      "ignore": ["\\.png$", "\\.jpg$"]
    }],
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 0,
    "react-native/no-inline-styles": 0,
    "react-native/no-color-literals": 0,
    "no-param-reassign": 0,
    "guard-for-in": 0,
    "no-restricted-syntax": 0,
    "no-plusplus": 0,
    "no-bitwise": 0,
    "no-loop-func": 0,
    "linebreak-style": [0 ,"error", "windows"],
    "no-case-declarations": 0,
  },
  settings: {
    "import/resolver": {
      "babel-module": {}
    }
  },
  globals: {
    "fetch": true,
    "__DEV__": true,
    "FormData": true
  },
  "env": {
    "jest/globals": true
  }
}