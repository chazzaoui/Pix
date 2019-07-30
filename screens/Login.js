import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView
} from "react-native";
import styles from "../styles.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { LinearGradient } from "expo";
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
  facebookLogin
} from "../actions/user";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

import firebase from "firebase";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Login extends React.Component {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      //checks if auth state changed
      if (user) {
        this.props.getUser(user.uid, "LOGIN"); // in the getuser the uid and type are being set as declared in de actions
        if (this.props.user != null) {
          // updates the state and redirects the user to login
          this.props.navigation.navigate("Home");
        }
      }
      //checks if user is there or not
    });
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/background.jpeg")}
        style={styles.bgImage}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../assets/logoo.png")}
            style={{ width: 50, height: 75, marginBottom: 40 }}
          />
          <KeyboardAvoidingView
            contentContainerStyle={styles.loginContainer}
            behavior="position"
          >
            <View style={styles.formContainer}>
              <View
                style={[
                  styles.border,
                  styles.row,
                  { justifyContent: "flex-start", alignItems: "center" }
                ]}
              >
                <MaterialCommunityIcons
                  style={{ backgroundColor: "transparent" }}
                  size={25}
                  name="email-outline"
                />
                <View style={{ marginLeft: 10, alignItems: "center" }}>
                  <TextInput
                    keyboardType={"email-address"}
                    value={this.props.user.email}
                    onChangeText={input => this.props.updateEmail(input)}
                    placeholder="Email"
                  />
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  styles.borderOne,
                  { justifyContent: "flex-start", alignItems: "center" }
                ]}
              >
                <SimpleLineIcons
                  style={{ backgroundColor: "transparent" }}
                  size={25}
                  name="lock"
                />
                <View style={{ marginLeft: 10 }}>
                  <TextInput
                    value={this.props.user.password} //returns the user input from the reducer
                    onChangeText={input => this.props.updatePassword(input)}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.props.login()} // allows to move to the next screen you insert
              >
                <LinearGradient
                  start={{ x: 0, y: 0.75 }}
                  end={{ x: 1, y: 0.25 }}
                  style={styles.button}
                  colors={["#f7b733", "#fc4a1a"]}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Login
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
              //style={styles.facebookButton}
              //onPress={() => this.props.facebookLogin()} // allows to move to the next screen you insert
              />

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Signup")} // allows to move to the next screen you insert
              >
                <View
                  style={styles.TouchableOpacityStyle}
                  style={[
                    styles.button,
                    {
                      backgroundColor: "#e5e5e5"
                    }
                  ]}
                >
                  <View style={styles.center}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      SignUp
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, facebookLogin },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    user: state.user //pulls up the whole reducer if we not define the specific reducer state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
