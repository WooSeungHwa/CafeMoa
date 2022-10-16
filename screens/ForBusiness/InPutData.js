import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { dbService } from '../../FireServer';
import { getUserId, getUserIds, signOut } from '../../lib/Auth';
import { CafeData } from '../../lib/CafeData';
import { addCafeDatabase, getCafeDatabase, updateCafeDatabase } from '../../lib/Database';

function InPutDataScreen({navigation}) {
  const [cafeName,setcafeName] = useState("");
  const [cafeLocation,setcafeLocation] = useState("");
  const [cafeImfo,setcafeImfo] = useState("");
  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeImfoInputRef = createRef();

  const [cafeDatas, setCafeDatas] = useState([]); //가져와질 데이터
  const [cafeClass, setCafeClass] = useState([]);
  useEffect(()=>{
    //화면 시작시 실행
  },[])

  const Button1 = () =>{
    //onSubmitApplication({cafeName,cafeLocation, cafeImfo});
    const cafeData = new CafeData(cafeName,cafeName,{latitude:"11312312", longitude:"3123412312"},cafeLocation,32);
    addCafeDatabase(cafeData); 
  }
  const Button2 = () =>{
    getUserIds();
  }
  const Button3 = () =>{
    signOut();
  }

  return (
  <KeyboardAvoidingView style={styles.container} >
    <View style={{flex: 3}}></View>
    <View style={styles.contentArea}>
      <View style={styles.titleText}><Text style={{ fontWeight: "900", fontSize: 50 }}> M O A </Text></View>
      <View style={styles.subTitleText}><Text style={{ fontWeight: "600", fontSize: 30 }}> Sing Up </Text></View>
      <View style={styles.formArea}>
        <TextInput
          ref={cafeNameInputRef}
          style={styles.textInput}
          placeholder={'카페이름'}
          onChangeText={(cafeName) => setcafeName(cafeName)}
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() =>
            cafeLocationInputRef.current && cafeLocationInputRef.current.focus()
          }
        />
        <TextInput
          ref={cafeLocationInputRef}
          style={styles.textInput}
          placeholder={'카페위치'}
          onChangeText={(cafeLocation) => setcafeLocation(cafeLocation)}
          autoCapitalize="none"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() =>
            cafeImfoInputRef.current && cafeImfoInputRef.current.focus()
          }
        />
        <TextInput
          ref={cafeImfoInputRef}
          style={styles.textInput}
          placeholder={'정보'}
          onChangeText={(cafeImfo) => setcafeImfo(cafeImfo)}
          autoCapitalize="none"
        />

      </View>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btnLogin} onPress = {Button1}>
          <Text style={{ color: 'white', fontSize: 20,}}> 데이터 넣기 </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress = {Button2}>
          <Text style={{ color: 'white', fontSize: 20,}}> 데이터 가져오기 </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress = {Button3}>
          <Text style={{ color: 'white', fontSize: 20,}}> 콘솔창에 출력하기 </Text>
        </TouchableOpacity>
      </View>
        <View>
          <Text>{}</Text>
        </View>
    </View>
    <View style={{flex: 4}}></View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: '#fff',
  alignItems: 'center',
},
contentArea: {
  width: '90%',
  height: 560,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "#fff",
},
titleText: {
  marginTop: 0,

},
subTitleText: {
  paddingRight: 200,
},

formArea: {
  marginVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
  width: '90%',
},
btnArea: {
  width: '75%',
  height: 100,
},
btnLogin: {
  margin: 5,
  width: '100%',
  height: 60,
  borderRadius: 7,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#111111',
},
btnRegister: {
  margin: 5,
  width: '100%',
  height: 60,
  borderRadius: 7,
  borderWidth: 3,
  borderColor: 'black',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
btnText:{
  color: 'white',
  fontSize: 20,
},
textInput: {
  marginVertical: 5,
  width: '100%',
  height: 60,
  borderWidth: 2,
  borderColor: 'black',
  borderRadius: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff',
  fontSize: 20,
},
errorText:{
  color: 'red',
  fontSize: 15,
  fontWeight: '400',
}
});

export default InPutDataScreen;
