import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Modal
} from "react-native";
import { connect } from "react-redux";
import styles from "../styles.js";
import firebase from "firebase";
import { bindActionCreators } from "redux";
import { followUser, unfollowUser } from "../actions/user";
import { LinearGradient } from "expo";
import { Container, Header, Content, Card, CardItem } from "native-base";
import { Feather, Ionicons, EvilIcons } from "@expo/vector-icons";
import moment from "moment";
class Profile extends React.Component {
  follow = user => {
    if (user.followers.indexOf(this.props.user.uid) >= 0) {
      this.props.unfollowUser(user);
    } else {
      this.props.followUser(user);
    }
  };

  _onPressItem(id) {
    this.setState({
      modalVisible: true,
      id: id
    });
  }
  signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      navigate("Auth");
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let user = {};
    const { state, navigate } = this.props.navigation;
    if (state.routeName === "UserProfile") {
      user = this.props.profile;
    } else {
      user = this.props.user;
    }
    if (!user.upload)
      return (
        <View style={styles.container}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24 }}>No pictures uploaded yet!</Text>
          </View>
        </View>
      );

    //add info and profile pic instead of activity indicator
    return (
      //the user is called without props because it is an object crreated locally and not an prop from redux
      <SafeAreaView style={styles.droidSafeArea}>
        <ScrollView>
          <View style={[{ flexDirection: "column" }]}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.elevationLow}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: user.photo }}
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  {user.username}
                </Text>
                <Text
                  style={[{ marginTop: 5, fontWeight: "400", opacity: 0.8 }]}
                >
                  {user.bio}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.row,
                styles.space,
                {
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "#F2F2F2",
                  marginVertical: 20,
                  marginHorizontal: 30
                }
              ]}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20
                }}
              >
                <Text style={[styles.bold, { paddingBottom: 5 }]}>
                  {user.upload.length}
                </Text>
                <Text style={[{ marginRight: 10, color: "#ADADAD" }]}>
                  Pictures
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20
                }}
              >
                <Text style={[styles.bold, { paddingBottom: 5 }]}>
                  {user.followers.length}
                </Text>
                <Text style={[{ marginRight: 10, color: "#ADADAD" }]}>
                  Followers
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 20
                }}
              >
                <Text style={[styles.bold, { paddingBottom: 5 }]}>
                  {user.following.length}
                </Text>
                <Text style={[{ marginRight: 10, color: "#ADADAD" }]}>
                  Following
                </Text>
              </View>
            </View>
          </View>

          <View>
            {state.routeName === "Profile" ? (
              <View style={[styles.row, { marginBottom: 20 }]}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Edit")}
                >
                  <LinearGradient
                    start={{ x: 0, y: 0.75 }}
                    end={{ x: 1, y: 0.25 }}
                    style={styles.buttonSmall}
                    colors={["#5978E2", "#8A69EB"]}
                  >
                    <Text
                      style={[
                        styles.bold,
                        {
                          color: "white",
                          alignItems: "center",
                          justifyContent: "center"
                        }
                      ]}
                    >
                      Edit Profile
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonMessage}
                  onPress={() => this.signOutUser()}
                >
                  <Feather color={"#3d5761"} name="log-out" size={16} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.row}>
                <TouchableOpacity onPress={() => this.follow(user)}>
                  <LinearGradient
                    start={{ x: 0, y: 0.75 }}
                    end={{ x: 1, y: 0.25 }}
                    style={styles.buttonSmall}
                    colors={["#5978E2", "#8A69EB"]}
                  >
                    <Text
                      style={[
                        styles.bold,
                        {
                          color: "white",
                          alignItems: "center",
                          justifyContent: "center"
                        }
                      ]}
                    >
                      {user.followers.indexOf(this.props.user.uid) >= 0
                        ? "UnFollow User"
                        : "Follow User"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonMessage}
                  onPress={() =>
                    this.props.navigation.navigate("Chat", user.uid)
                  }
                >
                  <Feather color={"#3d5761"} name="mail" size={16} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <FlatList
            horizontal={false}
            numColumns={1}
            data={user.upload}
            keyExtractor={item => JSON.stringify(item.date)}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.elevationLow,
                  { backgroundColor: "white", marginVertical: 10 }
                ]}
              >
                <View style={[styles.row, styles.space]}>
                  <View style={[styles.row, styles.center]}>
                    <Image
                      style={styles.roundImage}
                      source={{ uri: item.photo }}
                    />
                    <View>
                      <Text style={[styles.bold, { color: "#3d5761" }]}>
                        {item.username}
                      </Text>

                      <TouchableOpacity onPress={() => this.navigateMap(item)}>
                        <Text style={styles.gray}>
                          {item.uploadLocation
                            ? item.uploadLocation.name
                            : null}
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
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
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
                        source={{ uri: item.uploadPhoto }}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ followUser, unfollowUser }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
    profile: state.profile,
    upload: state.upload
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
