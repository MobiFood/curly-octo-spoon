const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@config": "src/config",
    "@assets": "src/assets",
    "@redux": "src/redux",
    "@src": "src",
    "@workers": "src/workers",
  })(config);

  return config;
};
