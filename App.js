import React from "react";
import SwitchNavigator from "./navigation/SwitchNavigator.js";
import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import firebase from "./config/firebase";
const middleware = applyMiddleware(thunkMiddleware, logger);
const store = createStore(reducer, middleware);

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      //pushes the global state from here (parent component) to all the child components
      <Provider store={store}>
        <SwitchNavigator />
      </Provider>
    );
  }
}
