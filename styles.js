import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  padLeft: {
    paddingLeft: width * 0.05
  },

  center: {
    alignItems: "center"
  },
  space: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    alignItems: "flex-start"
  },
  right: {
    alignItems: "flex-end"
  },
  row: {
    flexDirection: "row"
  },
  bold: {
    fontWeight: "bold"
  },
  white: {
    color: "#fff"
  },
  gray: {
    color: "#adadad"
  },
  small: {
    fontSize: 10
  },
  formContainer: {
    marginTop: 10,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    alignItems: "center",
    opacity: 0.9
  },

  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    fontSize: 16,
    padding: 10
  },
  commentInput: {
    alignItems: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 50,
    width: width * 0.9,
    marginVertical: 32,
    marginHorizontal: 16
  },
  facebookButton: {
    backgroundColor: "#3b5998",
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderColor: "#3b5998",
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  border: {
    width: "85%",

    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1
  },
  borderOne: {
    width: "85%",

    padding: 15,
    fontSize: 16,

    textAlign: "center"
  },
  elevationLow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6.46
      },
      android: {
        elevation: 9
      }
    })
  },
  postPhoto: {
    height: width * 0.9,
    width: width * 0.9
  },
  uploadPhoto: {
    height: 250,
    width: width
  },
  roundImage: {
    marginLeft: width * 0.05,
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 10,
    backgroundColor: "blue"
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, //should be half of width and height
    marginRight: 20,
    marginLeft: 30,
    marginTop: 10,
    backgroundColor: "#adadad"
  },
  cameraButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#fff",
    marginBottom: 50
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 300,
    height: 50
  },
  squareLarge: {
    height: 200,
    width: width * 0.5
  },

  white: {
    color: "white",
    fontWeight: "normal",
    fontFamily: "System"
  },

  buttonSmall: {
    marginVertical: 10,

    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    width: 250,
    height: 50,
    marginLeft: 30,
    marginRight: 20
  },
  buttonMessage: {
    marginVertical: 10,

    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 10,
    width: 48,
    backgroundColor: "#EDF3FC"
  },
  selectedCategoryText: {
    opacity: 1
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    backgroundColor: "transparent",
    opacity: 0.54
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 30 : 0
  }
}));
