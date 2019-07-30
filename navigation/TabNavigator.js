import React from "react";
import { Text, View } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home.js";
import Search from "../screens/Search.js";
import Upload from "../screens/Upload.js";
import Activity from "../screens/Activity.js";
import Profile from "../screens/Profile.js";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import {
  HomeNavigator,
  SearchNavigator,
  UploadNavigator,
  ActivityNavigator,
  ProfileNavigator
} from "./StackNavigator";
import styles from "../styles.js";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => <Feather color={"#3d5761"} name="home" size={32} />
      }
    },
    Search: {
      screen: SearchNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => <Feather color={"#3d5761"} name="search" size={32} />
      }
    },
    Upload: {
      screen: UploadNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => (
          <View
            style={[
              styles.elevationLow,
              {
                height: 30,
                width: 50,
                borderRadius: 10,
                backgroundColor: "#F93B92",

                alignItems: "center",
                justifyContent: "center"
              }
            ]}
          >
            <Feather color={"white"} name="plus" size={24} />
          </View>
        )
      }
    },
    Activity: {
      screen: ActivityNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={focused ? "heart" : "heart-outline"}
            color={"#3d5761"}
            size={32}
          />
        )
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: " ",
        tabBarIcon: () => <Feather color={"#3d5761"} name="user" size={32} />
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingVertical: 10,
        height: 60
      }
    }
  }
);

export default createAppContainer(TabNavigator);
