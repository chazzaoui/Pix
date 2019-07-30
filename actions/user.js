import db from "../config/firebase";
import firebase from "firebase";
import orderBy from "lodash/orderBy";
import { allowNotifications, sendNotification } from "./index";
import { LayoutAnimation } from "react-native";
import uuid from "uuid";

export const updateEmail = email => {
  return { type: "UPDATE_EMAIL", payload: email };
};
//Actions are payloads of information that send data from your application to your store.
export const updatePassword = password => {
  return { type: "UPDATE_PASSWORD", payload: password };
};

export const updateUsername = username => {
  return { type: "UPDATE_USERNAME", payload: username };
};

export const updateBio = bio => {
  return { type: "UPDATE_BIO", payload: bio };
};
export const updatePhoto = photo => {
  return { type: "UPDATE_PHOTO", payload: photo };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      LayoutAnimation.easeInEaseOut();
      const { email, password } = getState().user;
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password); //waits for the data being loaded before entering.
      dispatch(getUser(response.user.uid)); //gets only the neccassary information from auth
      //dispatch({ type: "LOGIN", payload: response.user });
      dispatch(allowNotifications()); //calls the permission when user logs in
    } catch (e) {
      alert(e);
    }
  };
};

export const facebookLogin = () => {
  return async dispatch => {
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
        "2145012158931147"
      );
      if (type === "success") {
        // Build Firebase credential with the Facebook access token.
        const credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );
        // Sign in with credential from the Facebook user.
        const response = await firebase.auth().signInWithCredential(credential);
        const user = await db
          .collection("users")
          .doc(response.uid)
          .get();
        if (!user.exists) {
          const user = {
            uid: response.uid,
            email: response.email,
            username: response.displayName,
            bio: "",
            photo: response.photoURL,
            followers: [],
            following: []
          };
          db.collection("users")
            .doc(response.uid)
            .set(user);
          dispatch({ type: "LOGIN", payload: user });
        } else {
          dispatch(getUser(response.uid));
        }
      }
    } catch (e) {
      alert(e);
    }
  };
};
export const getUser = (uid, type) => {
  return async (dispatch, getState) => {
    try {
      const userQuery = await db
        .collection("users")
        .doc(uid)
        .get();
      let user = userQuery.data();
      //querys the data from the database into the userobject
      let upload = [];
      const uploadQuery = await db
        .collection("upload")
        .where("uid", "==", uid)
        .get();
      uploadQuery.forEach(function(response) {
        upload.push(response.data());
      });
      user.upload = orderBy(upload, "date", "desc");
      console.log(user);
      if (type === "LOGIN") {
        dispatch({ type: "LOGIN", payload: user }); // updates the state , resolves the promise
      } else {
        dispatch({ type: "GET_PROFILE", payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const updateUser = () => {
  return async (dispatch, getState) => {
    const { uid, username, bio, photo } = getState().user;
    try {
      db.collection("users")
        .doc(uid)
        .update({
          username: username,
          bio: bio,
          photo: photo
        });
    } catch (e) {
      alert(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password, username, bio } = getState().user;
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
          username: username,
          bio: bio,
          photo: "",
          token: null,
          followers: [], //when adding new inputs in the user object, signup again or add in firebase. or else not implemented
          following: []
        };
        db.collection("users")
          .doc(response.user.uid)
          .set(user);
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const followUser = user => {
  return async (dispatch, getState) => {
    const { uid, photo, username, upload } = getState().user;
    try {
      db.collection("users")
        .doc(user.uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayUnion(uid)
        });
      db.collection("users")
        .doc(uid)
        .update({
          following: firebase.firestore.FieldValue.arrayUnion(user.uid)
        });
      db.collection("activity")
        .doc()
        .set({
          //sets al the user info and time into an activity feed when like pressed
          followerId: uid,
          followerPhoto: photo,
          followerName: username,
          uid: user.uid,
          photo: user.photo,
          user: user.username,
          date: new Date().getTime(),
          type: "FOLLOWER"
        });
      const id = uuid.v4();
      const followerPost = {
        followerId: user.uid,
        uploadPhoto: user.upload,
        uploadDescription: upload.description || "", // we get this from the getstate upload
        uploadLocation: upload.location || "",
        uid: user.uid,
        photo: user.photo || "",
        user: user.username,
        likes: [],
        comments: []
      };
      db.collection("followerUpload")
        .doc(id)
        .set(followerPost);
      dispatch(sendNotification(user.uid, "Started following you"));
      dispatch(getUser(user.uid));
    } catch (e) {
      console.error(e);
    }
  };
};

export const unfollowUser = user => {
  return async (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    try {
      db.collection("users")
        .doc(user.uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayRemove(uid)
        });
      db.collection("users")
        .doc(uid)
        .update({
          following: firebase.firestore.FieldValue.arrayRemove(user.uid)
        });
      dispatch(getUser(user.uid));
    } catch (e) {
      console.error(e);
    }
  };
};
