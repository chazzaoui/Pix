import db from "../config/firebase";
import firebase from "firebase";
import uuid from "uuid";
import cloneDeep from "lodash/cloneDeep";
import orderBy from "lodash/orderBy";
import { allowNotifications, sendNotification } from "./index";

export const updateDescription = text => {
  return { type: "UPDATE_DESCRIPTION", payload: text };
};
export const updatePhoto = input => {
  return { type: "UPDATE_UPLOAD_PHOTO", payload: input };
};
export const updateLocation = input => {
  return { type: "UPDATE_LOCATION", payload: input };
};

export const uploadPost = () => {
  return async (dispatch, getState) => {
    //gets user from database and all its info
    try {
      const { upload, user } = getState();
      const id = uuid.v4();
      const post = {
        id: id,
        uploadPhoto: upload.photo,
        uploadDescription: upload.description || "", // we get this from the getstate upload
        uploadLocation: upload.location || "",
        uid: user.uid,
        photo: user.photo || "",
        username: user.username,
        likes: [],
        comments: []
      };
      db.collection("upload")
        .doc(id)
        .set(post);
    } catch (e) {
      alert(e);
    }
  };
};

export const getUpload = () => {
  return async (dispatch, getState) => {
    //gets user from database and all its info
    try {
      const uploads = await db.collection("upload").get();
      let array = [];
      uploads.forEach(upload => {
        array.push(upload.data());
      });

      console.log(array);
      dispatch({ type: "GET_UPLOAD", payload: array });
    } catch (e) {
      alert(e);
    }
  };
};
export const getFollowerUpload = () => {
  return async (dispatch, getState) => {
    //gets user from database and all its info
    try {
      const followerUploads = await db.collection("followerUpload").get();
      let array1 = [];
      followerUploads.forEach(followerUpload => {
        array1.push(followerUpload.data());
      });

      console.log(array1);
      dispatch({ type: "GET_FOLLOWER_UPLOAD", payload: array1 });
    } catch (e) {
      alert(e);
    }
  };
};

export const likePost = upload => {
  return (dispatch, getState) => {
    const { uid, username, photo } = getState().user;
    try {
      db.collection("upload")
        .doc(upload.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(uid) //pushes the like into an array
        });
      db.collection("activity")
        .doc()
        .set({
          //sets al the user info and time into an activity feed when like pressed
          uploadId: upload.id,
          uploadPhoto: upload.uploadPhoto,
          likerId: uid,
          likerPhoto: photo,
          likerName: username,
          uid: upload.uid,
          date: new Date().getTime(),
          type: "LIKE"
        });
      dispatch(sendNotification(upload.uid, "Liked your post!")); //parameters are set according to the set object
      dispatch(getUpload());
    } catch (e) {
      console.error(e);
    }
  };
};

export const unlikePost = upload => {
  return async (dispatch, getState) => {
    const { uid } = getState().user;
    try {
      db.collection("upload")
        .doc(upload.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(uid)
        });
      const query = await db // creates a connection to the back-end and takes the clicked picture based on the upload id
        .collection("activity")
        .where("uploadId", "==", upload.id)
        .where("likerId", "==", uid)
        .get();
      query.forEach(response => {
        // deletes it from the back-end
        response.ref.delete();
      });
      dispatch(getUpload());
    } catch (e) {
      console.error(e);
    }
  };
};

export const getComments = upload => {
  return dispatch => {
    dispatch({
      type: "GET_COMMENTS",
      payload: orderBy(upload.comments, "date", "desc")
    });
  };
};

export const addComment = (text, upload) => {
  return (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    let comments = cloneDeep(getState().upload.comments.reverse()); //gets the state and uploads in direct without refresh
    try {
      const comment = {
        //creates an object for the comment and the neccesary info
        comment: text,
        commenterId: uid,
        commenterPhoto: photo || "",
        commenterName: username,
        date: new Date().getTime()
      };
      console.log(comment);
      db.collection("upload")
        .doc(upload.id) //error on id that is not unique . regualr id in firebase does work
        .update({
          comments: firebase.firestore.FieldValue.arrayUnion(comment) //pushes the  comments into an firestore array
        });
      comment.uploadId = upload.id;
      comment.uploadPhoto = upload.uploadPhoto;
      comment.uid = upload.uid;
      comment.type = "COMMENT";
      comments.push(comment); //pushes the deepstate clone into an array
      dispatch(sendNotification(upload.uid, text));
      dispatch({ type: "GET_COMMENTS", payload: comments.reverse() });

      db.collection("activity")
        .doc()
        .set(comment);
    } catch (e) {
      console.error(e);
    }
  };
};

/*const ref = await db.collection("upload").doc(id); //dont put the uid in here it will override it everytime the user posts something .doc gives a specific post
post.id = ref.id; // pulls the id firebase stores it with and assigns an id in the app to the post and not the user
ref.set(post);*/
