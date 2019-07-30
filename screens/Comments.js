import React from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import styles from "../styles.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addComment, getComments } from "../actions/upload";

class Comment extends React.Component {
  state = {
    comment: ""
  };

  componentDidMount = () => {
    const { params } = this.props.navigation.state;
    this.props.getComments(params);
  };

  postComment = () => {
    const { params } = this.props.navigation.state; //allows paramater to be send through navigation
    this.props.addComment(this.state.comment, params); //allows for the specific comment to only be shown to the id of the pic
    this.setState({ comment: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => JSON.stringify(item.date)}
          data={this.props.upload.comments}
          renderItem={({ item }) => (
            <View style={[styles.row, styles.space]}>
              <Image
                style={styles.roundImage}
                source={{ uri: item.commenterPhoto }}
              />
              <View style={[styles.container, styles.left]}>
                <Text>{item.commenterName}</Text>
                <Text>{item.comment}</Text>
              </View>
            </View>
          )}
        />
        <KeyboardAvoidingView style={styles.commentInput} behavior="position">
          <TextInput
            style={styles.input}
            onChangeText={comment => this.setState({ comment })}
            value={this.state.comment}
            multiline={true}
            ref={input => {
              this.textInput = input;
            }}
            returnKeyType="send"
            placeholder="Add Comment"
            onSubmitEditing={this.postComment}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addComment, getComments }, dispatch);
};

//gets the state from the reducer
const mapStateToProps = state => {
  return {
    user: state.user,
    upload: state.upload
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
