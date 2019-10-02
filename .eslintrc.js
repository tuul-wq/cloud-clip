const EXCLUDE_TAGS = ["button", "span", "h1", "router-link"];

module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    parser: "babel-eslint",
    // specifying a module sourcetype prevent eslint from marking import statements as errors
    sourceType: "module"
  },
  plugins: [
    'vue'
  ],
  extends: [
    // use the recommended rule set for both plain javascript and vue
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  rules: {
    // we should always disable console logs and debugging in production
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/order-in-components": ["error", {
      "order": [
        "LIFECYCLE_HOOKS",
        "computed"
      ]
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 5,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": ["error", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      "ignores": EXCLUDE_TAGS
    }]
  }
};
