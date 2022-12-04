import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  headerContainer: {
    width: "100%",
    height: 105,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
  },
  contentContainer: {
    width: "97%",
    flex:1,
  },
  cafeInfoHeader: {
    width: "100%",
    height: 120,
    marginTop: 10,
    flexDirection: "row",
  },
  cafeImagePicker: {
    height: 110,
    width: 110,
    margin: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  nameInputContainer: {
    flex:1,
    justifyContent: "flex-start",
    alignItems:"center",
    padding:5,
    paddingRight:20,
  },
  nameTextInput: {
    backgroundColor: "white",
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    fontSize: 17,
    paddingLeft:10,
    marginTop:10,
  },
  locationContainer:{
    height: 70,
    width: "100%",
    justifyContent: "center",
    padding:20,
    paddingHorizontal:10,

  },
  locationTextContainer:{
    flexDirection:"row",
    backgroundColor: "10"
  },
  locationBtn:{
    width:80,
    height: 40,
    borderColor: "#ccc",
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 10,

  },
  locationText:{
    width:"80%",
    fontSize: 15,
  },
  locationButton: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  cafeTimeContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    alignSelf:"center",
    flexDirection: "row",
  },
  oncTimeContainer: {
    width: "30%",
    height: "100%",
  },
  timeTextInput: {
    textAlign: "center",
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  
  seatImagePickerContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  setImagePicker: {
    width: "95%",
    height: "95%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
  },
  submitBtnContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    padding:20,
    
  },
  submitButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#001D44",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});

export default styles;
