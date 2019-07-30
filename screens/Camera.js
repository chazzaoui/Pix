import React from "react";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Camera, Permissions, ImageManipulator } from "expo";
import { connect } from "react-redux";
import { updatePhoto } from "../actions/upload";
import { bindActionCreators } from "redux";
import { uploadPhoto } from "../actions/index";

class CameraUpload extends React.Component {
  snapPhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA); //asks phone for acces to camera /status has been object destructured
    if (status === "granted") {
      const image = await this.camera.takePictureAsync();
      if (!image.cancelled) {
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
          format: "jpg",
          compress: 0.1
        });
        const url = await this.props.dispatch(uploadPhoto(resize)); //gets the information from the upload function
        this.props.dispatch(updatePhoto(url)); //updates the photo , if this.props.dispatch dont put dispatch in connect
        url ? this.props.navigation.navigate("Upload") : null; // cheecks if there is a photo if so, it goes to the post feed
      }
    }
  };

  render() {
    return (
      <Camera
        style={{ flex: 1 }}
        ref={ref => {
          this.camera = ref;
        }}
        type={Camera.Constants.Type.back}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ paddingLeft: 30 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Ionicons color={"white"} name={"ios-arrow-back"} size={50} />
          </TouchableOpacity>
        </SafeAreaView>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() => this.snapPhoto()}
        />
      </Camera>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch);
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(CameraUpload);
