// frontend/babel.config.js
module.exports = {
  presets: ['@vitejs/plugin-react/babel'],
  plugins: [
    [
      "@emotion/babel-plugin",
      { 
        "sourceMap": true,
        "autoLabel": "always",
        "labelFormat": "[local]"
      }
    ]
  ]
};