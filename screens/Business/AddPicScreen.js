import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
  FlatList,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import Ionicons from "react-native-vector-icons/Ionicons";

function AddPicScreen({ navigation, route }) {
  const { cafeData: cafeData } = route.params;
  const [image, setImage] = useState();
  let addedImgArr = [];

  useEffect(() => {
  }, []);

  const PickImage = () =>{

  }


  const onSubmit = () => {
    navigation.pop();
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.LogoImagePicker} onPress={PickImage}>
          <Text style={{ color: "#ccc", fontSize: 40 }}>+</Text>
        </TouchableOpacity>
        {image && (
          <Image source={{ uri: image }} style={{ width: 140, height: 140 }} />
        )}
        {/* <FlatList
          keyExtractor={(item) => item.idx}
          data={addedImgArr}
          style={styles.picArea}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
              }}
            >
              <Image style={styles.image} source={{}} />
            </View>
          )}
          numColumns={3}
        /> */}
      </View>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={onSubmit}
      >
        <Text style={{ color: "#001D44", fontSize: 20, fontWeight: "900" }}>
          추가 완료하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  LogoImagePicker: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  completeButton: {
    marginTop: 20,
  },
});

export default AddPicScreen;
