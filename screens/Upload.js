import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ImagePicker, Location, Permissions } from "expo";
import { NavigationEvents } from "react-navigation";
import {
  updateDescription,
  updateLocation,
  uploadPost,
  updatePhoto
} from "../actions/upload";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import styles from "../styles";
import { uploadPhoto } from "../actions";
const GOOGLE_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

class Upload extends React.Component {
  state = {
    showModal: false,
    locations: []
  };

  upload = () => {
    this.props.uploadPost();
    this.props.navigation.navigate("Home");
  };

  onWillFocus = () => {
    if (!this.props.upload.photo) {
      this.openLibrary();
    }
  };
  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image);
        this.props.updatePhoto(url);
      }
    }
  };

  setLocation = location => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng
      }
    };
    this.setState({ showModal: false });
    this.props.updateLocation(place);
  };

  getLocations = async () => {
    this.setState({ showModal: true });
    const permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.status === "granted") {
      console.log(permission);
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${
        location.coords.longitude
      }&rankby=distance&key=AIzaSyAEOxwSZ1aMJL5gMbR5KZLPT9iD-wX37fk`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ locations: data.results });
      console.log(data);
    }
  };

  render() {
    return (
      <View
        style={[styles.container, styles.center, { justifyContent: "center" }]}
      >
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
        >
          <SafeAreaView style={[styles.container, styles.center]}>
            <FlatList
              keyExtractor={item => item.id}
              data={this.state.locations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.border}
                  onPress={() => this.setLocation(item)}
                >
                  <Text style={styles.gray}>{item.name}</Text>
                  <Text style={styles.gray}>{item.vicinity}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Modal>
        <Image
          style={styles.uploadPhoto}
          source={{ uri: this.props.upload.photo }}
        />

        <TextInput
          style={styles.border}
          value={this.props.upload.description}
          multiline={true}
          onChangeText={text => this.props.updateDescription(text)}
          placeholder="Description"
        />

        <TouchableOpacity style={styles.border} onPress={this.getLocations}>
          <Text style={styles.gray}>
            {this.props.upload.location
              ? this.props.upload.location.name
              : "Add a Location"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.upload}>
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateDescription,
      uploadPost,
      updateLocation,
      uploadPhoto,
      updatePhoto
    },
    dispatch
  );
};

//gets the state from the reducer
const mapStateToProps = state => {
  return {
    upload: state.upload,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
