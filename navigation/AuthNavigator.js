import React from "react";
import Login from "../screens/Login.js";
import Signup from "../screens/Signup.js";
import { createStackNavigator, createAppContainer } from "react-navigation";

//creates a auth screen that is stacked on top of the main screen
const StackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(StackNavigator);
