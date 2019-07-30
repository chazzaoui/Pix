import db from "../config/firebase";
import { orderBy } from "lodash";
import cloneDeep from "lodash/cloneDeep";
export const getMessages = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    let messages = [];
    try {
      const query = await db
        .collection("messages")
        .where("members", "array-contains", uid) //gets the container with the user and user send id
        .get();
      query.forEach(response => {
        let message = response.data();
        messages.push(message);
      });
      dispatch({
        type: "GET_MESSAGES",
        payload: orderBy(messages, "date", "desc")
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const addMessage = (id, text) => {
  return (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    let messages = cloneDeep(getState().messages.reverse());
    try {
      const message = {
        members: [id, uid].sort(), //allows the id of u and the user to be pushed in an array. and has both in a container
        message: text,
        photo: photo,
        username: username,
        uid: uid,
        date: new Date().getTime()
      };
      db.collection("messages")
        .doc()
        .set(message); //sets the message function to the firebase
      messages.push(message);

      dispatch({ type: "GET_MESSAGES", payload: messages.reverse() }); //says what the action aftyer the clonedeep needs to be
    } catch (e) {
      console.error(e);
    }
  };
};
