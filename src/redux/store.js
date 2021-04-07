const { createStore } = require("redux");
const { default: rootReducer } = require("./reducer");

const store = createStore(rootReducer);

export default store;
