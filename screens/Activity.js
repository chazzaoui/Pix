import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { Text, View, FlatList, ActivityIndicator, Image } from "react-native";
import db from "../config/firebase";
import orderBy from "lodash/orderBy";
import moment from "moment";

class Activity extends React.Component {
  state = {
    activity: []
  };

  componentDidMount = () => {
    this.getActivity();
  };
  //retrieves the changes in database and sends them back as response
  getActivity = async () => {
    let activity = [];
    const query = await db
      .collection("activity")
      .where("uid", "==", this.props.user.uid)
      .get();
    query.forEach(response => {
      activity.push(response.data());
    });
    this.setState({ activity: orderBy(activity, "date", "desc") });
  };

  renderList = item => {
    //switch case to recognize the type of action, and allows for more functionalities such as follow and unfollw etc
    switch (item.type) {
      case "LIKE":
        return (
          <View style={[styles.row, styles.space]}>
            <Image
              style={styles.roundImage}
              source={{ uri: item.likerPhoto }}
            />
            <View style={[styles.container, styles.left]}>
              <Text style={styles.bold}>{item.likerName}</Text>
              <Text style={styles.gray}>Liked Your Photo</Text>
              <Text style={[styles.gray, styles.small]}>
                {moment(item.date).format("ll")}
              </Text>
            </View>
            <Image
              style={styles.roundImage}
              source={{ uri: item.uploadPhoto }}
            />
          </View>
        );
      case "COMMENT":
        //put the item.comment and time in  a view component so it stays in one box.
        return (
          <View style={[styles.row, styles.space]}>
            <Image
              style={styles.roundImage}
              source={{ uri: item.commenterPhoto }}
            />

            <View style={[styles.container, styles.left]}>
              <Text style={styles.bold}>{item.commenterName}</Text>
              <Text style={styles.gray}>{item.comment}</Text>
              <Text style={[styles.gray, styles.small]}>
                {moment(item.date).format("ll")}
              </Text>
            </View>

            <Image
              style={styles.roundImage}
              source={{ uri: item.uploadPhoto }}
            />
          </View>
        );
      default:
        null;
    }
  };

  render() {
    if (this.state.activity.length <= 0)
      return (
        <View style={styles.container}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 24,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              No Activity yet!
            </Text>
          </View>
        </View>
      );
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.getActivity()} //refreshes on pulldown
          refreshing={false}
          data={this.state.activity}
          keyExtractor={item => JSON.stringify(item.date)}
          renderItem={({ item }) => this.renderList(item)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Activity);
