import React, {useState, useEffect, createRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, } from 'react-native';
import { getRandomCafeData } from '../../lib/TestSample';
import { getGeoLocation } from '../../lib/LocationService';
import { 
  addCafeDatabase, 
  CafeService, 
  getCafeDatabase,
  getCafeDatabaseAd,
} from '../../lib/CafeService';
import { ReviewService } from '../../lib/ReviewService';

function InPutDataScreen({navigation}) {
  const [cafeName,setcCafeName] = useState("");
  const [cafeLocation,setCafeLocation] = useState({latitude:37, longitude:127});
  const [cafeImfo,setcafeImfo] = useState("");
  const cafeNameInputRef = createRef();
  const cafeLocationInputRef = createRef();
  const cafeImfoInputRef = createRef();
  const cafeTimeRef = createRef();
  const [local,setLocal] = useState("");

  const [cafeDatas, setCafeDatas] = useState([]); //가져와질 데이터
  const [cafeClass, setCafeClass] = useState([]);

  const [image,setImage] = useState();
  const [name,setName] = useState();
  useEffect(()=>{
    setting();
  },[])

  const setting = async() => {
    setLocal(await getGeoLocation());
  }

  const Button1 = async() =>{
    var data
    await getRandomCafeData().then((cafe)=>{
      data = cafe;
    });
    
    let cafeservice = new CafeService();
    cafeservice.addCafeDatabase(data);
  }
  const Button2 = async() =>{
  }

  const Button3 = async() =>{

    // 아래는 테스트 예시, 성공! 삭제 가능
    // let userdata = await getUserProfile();
    // console.log(userdata);
    // let userre = await getReservetionToUser();
    // console.log(userre);
    // let userdel = await deleteReservationToUser();
    // console.log(userdel);
    
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
          onChangeText={(cafeName) => setcCafeName(cafeName)}
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
          onChangeText={(cafeLocation) => setCafeLocation(cafeLocation)}
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
        <View>
          <Text>{name}</Text>
          <Image source={ (image != null) ? { uri: image } : null } style={{ width: 100, height: 100 }} />
        </View>
      
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