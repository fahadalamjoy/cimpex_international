import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { rootReducer } from "./redux/rootReducer";

const finalReducer = combineReducers({
  rootReducer: rootReducer,
});

const initailState = {
  rootReducer: {
    posUser: localStorage.getItem("pos-user")
      ? JSON.parse(localStorage.getItem("pos-user"))
      : [],
  },
};

const store = createStore(finalReducer, initailState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
