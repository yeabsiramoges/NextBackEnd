module.exports = {
  parserOptions: {
    project: ['./tsconfig.json']
  },
  "extends": [
    "next/core-web-vitals",
    "airbnb-base",
    "airbnb-typescript",
    "plugin:prettier/recommend",
  ],
  "rules": {
    "no-underscore-dangle": 0,
  }
}
