import React from "react";
import {
  Text,
  View,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getUpload,
  likePost,
  unlikePost,
  getFollowerUpload
} from "../actions/upload";
import styles from "../styles.js";
import firebase from "firebase";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import moment from "moment";
class Home extends React.Component {
  componentDidMount() {
    this.props.getUpload();
    this.props.getFollowerUpload();
  }

  likePost = upload => {
    const { uid } = this.props.user;
    if (upload.likes.includes(uid)) {
      this.props.unlikePost(upload);
    } else {
      this.props.likePost(upload);
    }
  };

  navigateMap = item => {
    console.log(this.props.navigation);
    this.props.navigation.navigate("Map", { location: item.uploadLocation });
  };

  render() {
    if (this.props.upload === null)
      return (
        <View style={styles.container}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24, justifyContent: "center" }}>
              Go Upload your first post!
            </Text>
          </View>
        </View>
      );

    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => {
            this.props.getUpload(), this.props.getFollowerUpload();
          }}
          refreshing={false}
          data={this.props.user.upload}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={[styles.row, styles.space]}>
                <View style={[styles.row, styles.center]}>
                  <Image
                    style={styles.roundImage}
                    source={{ uri: item.photo }}
                  />
                  <View>
                    <Text style={[styles.bold, { color: "#3d5761" }]}>
                      {item.user}
                      {item.username}
                    </Text>

                    <TouchableOpacity onPress={() => this.navigateMap(item)}>
                      <Text style={styles.gray}>
                        {item.uploadLocation ? item.uploadLocation.name : null}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ paddingRight: 20 }}>
                  <Text style={[styles.gray, styles.small]}>
                    {moment(item.date).format("ll")}
                  </Text>
                </View>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity onPress={() => this.likePost(item)}>
                  <View
                    style={[
                      styles.elevationLow,
                      { backgroundColor: "white", borderRadius: 20 }
                    ]}
                  >
                    <Image
                      style={[
                        styles.postPhoto,
                        { borderRadius: 20, overflow: "hidden" }
                      ]}
                      source={{
                        uri: item.uploadPhoto
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.row,
                  styles.padLeft,
                  {
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingTop: 10
                  }
                ]}
              >
                <Ionicons
                  name={
                    item.likes.includes(this.props.user.uid)
                      ? "ios-heart"
                      : "ios-heart-empty"
                  }
                  size={30}
                />
                <Text style={{ paddingHorizontal: 10, fontWeight: "800" }}>
                  {item.likes.length}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Comment", item)
                  }
                >
                  <EvilIcons
                    style={{ paddingLeft: 5 }}
                    name="comment"
                    size={35}
                  />
                </TouchableOpacity>
                <Text style={{ paddingHorizontal: 10, fontWeight: "800" }}>
                  {item.comments.length}
                </Text>
              </View>
              <View
                style={[
                  { paddingVertical: 10, paddingHorizontal: 15 },
                  { alignItems: "flex-start" }
                ]}
              >
                <Text style={{ fontWeight: "400", opacity: 0.8 }}>
                  {item.uploadDescription}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
//gets function type from the actions
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { getUpload, likePost, unlikePost, getFollowerUpload },
    dispatch
  );
};

//gets the state from the reducer
const mapStateToProps = state => {
  return {
    followerUpload: state.followerUpload,
    upload: state.upload,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
