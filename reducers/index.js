import { combineReducers } from "redux";

//Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
const user = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload; // gets rid of whatever state and just returns the payload. overrides it
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_USERNAME":
      return { ...state, username: action.payload };
    case "UPDATE_BIO":
      return { ...state, bio: action.payload };
    case "UPDATE_PHOTO":
      return { ...state, photo: action.payload };
    case "GET_TOKEN":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

const profile = (state = {}, action) => {
  switch (action.type) {
    case "GET_PROFILE": //creates an action that allows the profile of an other to be seen without the edit
      return action.payload;
    default:
      return state;
  }
};

const messages = (state = {}, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return action.payload;
    default:
      return state;
  }
};

const upload = (state = null, action) => {
  switch (action.type) {
    case "UPDATE_UPLOAD_PHOTO":
      return { ...state, photo: action.payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: action.payload }; // this returns the state and updates it. and does not override. cause payload is specified
    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };
    case "GET_UPLOAD":
      return { ...state, feed: action.payload };
    case "GET_FOLLOWER_UPLOAD":
      return { ...state, followerFeed: action.payload };
    case "GET_COMMENTS":
      return { ...state, comments: action.payload };
    default:
      return state;
  }
};
const modal = (state = null, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modal: action.payload };
    case "CLOSE_MODAL":
      return { ...state, modal: false };
    default:
      return state;
  }
};

// combine the single reducers in one parent reducer for export
const rootReducer = combineReducers({
  user,
  upload,
  modal,
  profile,
  messages
});

export default rootReducer;
