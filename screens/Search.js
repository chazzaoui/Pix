import React from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  View,
  Image,
  TouchableOpacity
} from "react-native";
import styles from "../styles.js";
import db from "../config/firebase";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../actions/user";

class Search extends React.Component {
  state = {
    search: "",
    query: []
  };

  searchUser = async () => {
    //just like with the activity feed it querys to all available data and send them through
    let search = [];
    const query = await db
      .collection("users")
      .where("username", ">=", this.state.search)
      .get();
    query.forEach(response => {
      search.push(response.data());
    });
    this.setState({ query: search });
  };

  userProfile = user => {
    this.props.getUser(user.uid);
    this.props.navigation.navigate("UserProfile");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={search => this.setState({ search })}
          value={this.state.search}
          returnKeyType="send"
          placeholder="Search"
          onSubmitEditing={this.searchUser}
        />
        <FlatList
          data={this.state.query}
          keyExtractor={item => JSON.stringify(item.uid)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.userProfile(item)}
              style={[styles.row, styles.space]}
            >
              <Image style={styles.roundImage} source={{ uri: item.photo }} />
              <View style={[styles.container, styles.left]}>
                <Text style={styles.bold}>{item.username}</Text>
                <Text style={styles.gray}>{item.bio}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
