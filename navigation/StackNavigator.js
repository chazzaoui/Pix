import React from "react";
import CameraScreen from "../screens/Camera";
import HomeScreen from "../screens/Home";
import SearchScreen from "../screens/Search";
import UploadScreen from "../screens/Upload";
import ActivityScreen from "../screens/Activity";
import ProfileScreen from "../screens/Profile";
import MapScreen from "../screens/Map";
import EditScreen from "../screens/Signup";
import CommentScreen from "../screens/Comments";
import ChatScreen from "../screens/Chat";
import MessagesScreen from "../screens/Messages";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Image, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

//creates a auth screen that is stacked on top of the main screen
export const HomeNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0
        },
        headerTitle: (
          <Image
            style={{
              width: 60,
              height: 25,
              flex: 1
            }}
            resizeMode="contain"
            source={require("../assets/logoname.png")}
          />
        ),
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            <Feather
              color={"#3d5761"}
              style={{ marginLeft: 10 }}
              name={"camera"}
              size={30}
            />
          </TouchableOpacity>
        ),

        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <Feather
              color={"#3d5761"}
              style={{ marginRight: 10 }}
              name={"inbox"}
              size={30}
            />
          </TouchableOpacity>
        )
      })
    },
    Comment: {
      screen: CommentScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Comments",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        )
      })
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Map View",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        )
      })
    },
    Chat: {
      screen: ChatScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Chat",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        )
      })
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Messages",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        )
      })
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        header: null
      }
    }
  })
);

HomeNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.some(route => route.routeName === "Camera")) {
    tabBarVisible = false;
  }
  if (navigation.state.routes.some(route => route.routeName === "Map")) {
    tabBarVisible = false;
  }
  if (navigation.state.routes.some(route => route.routeName === "Comment")) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export const SearchNavigator = createAppContainer(
  createStackNavigator({
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null
      }
    },
    UserProfile: {
      //creates the route to user being searched in search

      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0
        },
        title: "user profile",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        )
      })
    }
  })
);

export const UploadNavigator = createAppContainer(
  createStackNavigator({
    Post: {
      screen: UploadScreen,
      navigationOptions: {
        title: "Upload"
      }
    }
  })
);

export const ActivityNavigator = createAppContainer(
  createStackNavigator({
    Activity: {
      screen: ActivityScreen,
      navigationOptions: {
        title: "Activity"
      }
    }
  })
);

export const ProfileNavigator = createAppContainer(
  createStackNavigator({
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile",
        //header: null,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0
        }
      }
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Edit Profile",
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons style={styles.icon} name={"ios-arrow-back"} size={30} />
          </TouchableOpacity>
        )
      })
    }
  })
);

/*ProfileNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.routes.some(route => route.routeName === "Edit")) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};*/
