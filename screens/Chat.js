import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from "react-native";
import { addMessage } from "../actions/messages";
import moment from "moment";

class Chat extends React.Component {
  state = {
    message: ""
  };

  componentDidMount = () => {};

  sendMessage = () => {
    const { params } = this.props.navigation.state;
    this.props.addMessage(params, this.state.message);
    this.setState({ message: "" });
  };

  render() {
    const { params } = this.props.navigation.state;
    const { uid } = this.props.user;
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
        <FlatList
          inverted
          keyExtractor={item => JSON.stringify(item.date)}
          data={this.props.messages.filter(
            message =>
              message.members.indexOf(params) >= 0 &&
              message.members.indexOf(this.props.user.uid) >= 0
          )} //checks if the uid and the user uid have something in the array to be shown
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.goToChat(item)}
              style={[styles.row, styles.space]}
            >
              {item.uid !== uid ? (
                <Image style={styles.roundImage} source={{ uri: item.photo }} />
              ) : null}
              <View
                style={[
                  styles.container,
                  item.uid === uid ? styles.right : styles.left
                ]} //differentiates if the uid is the same as the chat uid it sets the text to te right,
              >
                <Text style={styles.bold}>{item.username}</Text>
                <Text style={styles.gray}>{item.message}</Text>
                <Text style={[styles.gray, styles.small]}>
                  {moment(item.date).format("ll")}
                </Text>
              </View>
              {item.uid === uid ? (
                <Image style={styles.roundImage} source={{ uri: item.photo }} />
              ) : null}
            </TouchableOpacity>
          )}
        />
        <TextInput
          style={styles.input}
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
          returnKeyType="send"
          placeholder="Send Message"
          onSubmitEditing={this.sendMessage}
        />
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addMessage }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
