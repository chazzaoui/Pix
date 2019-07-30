import uuid from "uuid";
import firebase from "firebase";
import { Permissions, ImageManipulator, Notifications } from "expo";
const PUSH_ENDPOINT = "https://exp.host/--/api/v2/push/send";

import db from "../config/firebase";

export const uploadPhoto = image => {
  return async dispatch => {
    try {
      const resize = await ImageManipulator.manipulateAsync(image.uri, [], {
        format: "jpg",
        compress: 0.1
      });
      const blob = await new Promise((resolve, reject) => {
        //creates a promise with our image uri and resolves that promise
        const xhr = new XMLHttpRequest(); //http request
        xhr.onload = () => resolve(xhr.response);
        xhr.responseType = "blob"; //converts it into a blob
        xhr.open("GET", resize.uri, true); // sends that blob back to get the data
        xhr.send(null);
      });
      const uploadTask = await firebase
        .storage()
        .ref()
        .child(uuid.v4()) //creates a unique id
        .put(blob);
      const downloadURL = await uploadTask.ref.getDownloadURL();
      return downloadURL;
    } catch (e) {
      console.error(e);
    }
  };
};

export const allowNotifications = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (permission.status === "granted") {
        const token = await Notifications.getExpoPushTokenAsync(); //pushes the token into the firebase token setup in user
        dispatch({ type: "GET_TOKEN", payload: token });
        db.collection("users")
          .doc(uid)
          .update({ token: token });
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const sendNotification = (uid, text) => {
  //takes two parameters
  //this is an api request
  return async (dispatch, getState) => {
    const { username } = getState().user;
    try {
      const user = await db
        .collection("users")
        .doc(uid)
        .get();
      if (user.data().token) {
        //retrieves the token uploaded to firestore
        fetch(PUSH_ENDPOINT, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            to: user.data().token,
            title: username,
            body: text
          })
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
};
