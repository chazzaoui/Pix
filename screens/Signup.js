import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import {
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign
} from "@expo/vector-icons";
import styles from "../styles.js";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  updateUsername,
  updateBio,
  signup,
  updatePhoto,
  updateUser
} from "../actions/user";
import { ImagePicker, Permissions } from "expo";
import { uploadPhoto } from "../actions";

class Signup extends React.Component {
  componentDidMount = () => {
    const { routeName } = this.props.navigation.state;
    console.log(routeName);
  };

  onPress = () => {
    const { routeName } = this.props.navigation.state;
    if (routeName === "Signup") {
      this.props.signup();
      this.props.navigation.navigate("Home");
    } else {
      this.props.updateUser();
      this.props.navigation.goBack();
    }
  };

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image);
        this.props.updatePhoto(url);
        console.log(url);
      }
    }
  };

  render() {
    const { routeName } = this.props.navigation.state;
    return (
      <SafeAreaView>
        <KeyboardAvoidingView contentContainerStyle={[]}>
          <View style={[styles.formContainer, { justifyContent: "center" }]}>
            <TouchableOpacity style={styles.center} onPress={this.openLibrary}>
              <Image
                style={styles.roundImage}
                source={{ uri: this.props.user.photo }}
              />
              <Text style={styles.bold}>Upload Photo</Text>
            </TouchableOpacity>
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
              <View style={{ marginLeft: 10 }}>
                <TextInput
                  editable={routeName === "Signup" ? true : false}
                  value={this.props.user.email}
                  onChangeText={input => this.props.updateEmail(input)}
                  placeholder="Email"
                />
              </View>
            </View>
            <View
              style={[
                styles.border,
                styles.row,
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
                  editable={routeName === "Signup" ? true : false}
                  value={this.props.user.password}
                  onChangeText={input => this.props.updatePassword(input)}
                  placeholder="Password"
                  secureTextEntry={true}
                />
              </View>
            </View>
            <View
              style={[
                styles.border,
                styles.row,
                { justifyContent: "flex-start", alignItems: "center" }
              ]}
            >
              <AntDesign
                style={{ backgroundColor: "transparent" }}
                size={25}
                name="user"
              />
              <View style={{ marginLeft: 10 }}>
                <TextInput
                  value={this.props.user.username}
                  onChangeText={input => this.props.updateUsername(input)}
                  placeholder="Username"
                />
              </View>
            </View>
            <View
              style={[
                styles.border,
                styles.row,
                { justifyContent: "flex-start", alignItems: "center" }
              ]}
            >
              <SimpleLineIcons
                style={{ backgroundColor: "transparent" }}
                size={25}
                name="notebook"
              />
              <View style={{ marginLeft: 10 }}>
                <TextInput
                  value={this.props.user.bio}
                  multiline={true}
                  onChangeText={input => this.props.updateBio(input)}
                  placeholder="Bio"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={this.onPress}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateEmail,
      updatePassword,
      updateUsername,
      updateBio,
      signup,
      updateUser,
      updatePhoto,
      uploadPhoto
    },
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
)(Signup);
