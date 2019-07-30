import React from "react";
import TabNavigator from "./TabNavigator.js";
import AuthNavigator from "./AuthNavigator.js";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

//creates a switch between the auth screen and the main tabs after authorization
const SwitchNavigator = createSwitchNavigator(
  {
    Home: {
      screen: TabNavigator
    },
    Auth: {
      screen: AuthNavigator
    }
  },
  {
    // sets the first screen to appear, in  this case the authorization screen
    initialRouteName: "Auth"
  }
);

export default createAppContainer(SwitchNavigator);
