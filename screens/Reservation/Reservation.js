import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

import getReserveStyle from "../../styles/screens/ReserveStyle";
import getCafeTableStyle from "../../styles/components/CafeTableStyle";
import getFindStyle from "../../styles/components/FindStyle";
import getModalStyle from "../../styles/components/ModalStyle";

import {
  ReservationService,
  getSeatDataOnTime,
} from "../../lib/ReservationService";
import { sendReservetionToUser } from "../../lib/UserDataService";
import { CafeData } from "../../lib/CafeData";

function ReservationScreen({ navigation, route }) {
  const { cafeData: cafe_data } = route.params;

  const [cafeData, setCafeData] = useState(cafe_data);
  const [seatImage, setSeatImage] = useState(cafe_data.getSeatImage());
  const [seatData, setSeatData] = useState();
  const [selectedSeat, setSelectedSeat] = useState();
  const [modalVisible, setModalVisible] = useState(true);
  const [modalOutput, setModalOutput] = useState("Open Modal");
  const [time, setTime] = useState(0);

  const [seatList, setSeatList] = useState();
  //최대 자릿수 - 현제 예약된 자릿수
  const notReserveSeat = async () => {};

  useEffect(() => {
    SeatTimeTable();
  }, []);

  const SeatTimeTable = async () => {
    let timeTable = new ReservationService(cafeData.getSeatId());
    await timeTable.loadSeatDataBase();
    setSeatData(timeTable);
  };

  var timeLoop = [];
  const timeArr = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  for (let i = 0; i < timeArr.length; i++) {
    timeLoop.push(
      <TouchableOpacity
        key={i}
        style={getModalStyle.modalButton}
        onPress={() => {
          setModalOutput("선택");
          setModalVisible(false);
          onSelectTime(i + cafeData.getOpenTime());
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 20 }}>{timeArr[i]}</Text>
      </TouchableOpacity>
    );
  }

  function onSelectTime(time) {
    setTime(time);
    makePickerItem(time);
  }

  // picker item에 추가하는 loop

  const makePickerItem = (time) => {
    setTime(time);
    let arr = new Array();
    var seatLoop = [];
    seatData.getSeatDataOnTime(time).forEach((element) => {
      arr.push(element.seat);
    });
    for (var i = 1; i <= cafeData.getSeatCount(); i++) {
      if (
        arr.find(function (data) {
          return data == i;
        }) == null
      ) {
        seatLoop.push(<Picker.Item key={i} label={String(i)} value={i + 1} />);
      }
    }
    setSeatList(seatLoop);
  };

  const submitReservation = async () => {
    let reserveSrv = new ReservationService();
    reserveSrv = seatData;
    if (await reserveSrv.doSeatReservation(time, selectedSeat)) {
      await sendReservetionToUser(
        cafeData.id,
        reserveSrv.seatId,
        time,
        reserveSrv.seatNumber
      );
      navigation.navigate("ReserveEnd");
    }
  };

  return (
    <View style={getReserveStyle.container}>
      <Modal
        isVisible={modalVisible}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <>
          <View style={getModalStyle.modalView}>
            <View style={getModalStyle.modalWrapper}>
              <Text style={getModalStyle.modalGradeText}>
                시간을 선택하세요
              </Text>
            </View>
            <ScrollView style={getModalStyle.ScrollView}>{timeLoop}</ScrollView>
          </View>
        </>
      </Modal>

      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable cafeData={cafeData} navigation={navigation} />
        </View>
      </View>

      <View style={getReserveStyle.seatContainer}>
        <Image
          source={{ uri: seatImage }}
          resizeMode="stretch"
          style={getReserveStyle.seatPic}
        />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={getReserveStyle.pickerTopTextArea}>
          <Text style={getReserveStyle.pickerTopText}>좌석 예약</Text>
        </View>
        <View style={{ flex: 2, marginBottom: 15 }}>
          <View style={getReserveStyle.pickerBox}>
            <View style={getReserveStyle.pickerLine}>
              <Picker
                style={getReserveStyle.picker}
                selectedValue={selectedSeat}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedSeat(itemValue);
                }}
              >
                {seatList}
              </Picker>
            </View>
            <TouchableOpacity
              style={getReserveStyle.reserveBtn}
              onPress={submitReservation}
            >
              <Text style={{ color: "white", fontSize: 15 }}>예약하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const cafeData = props.cafeData;
  const [cafeName, setCafeName] = useState(cafeData.getName());
  const [cafeLocation, setCafeLocation] = useState(cafeData.getAdress(1, 3));
  const [cafeInformation, setCafeInformaion] = useState(
    "Open : " +
      cafeData.getOpenTime() +
      ":00 ~ Close : " +
      cafeData.getCloseTime() +
      ":00"
  );
  const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.getLogo());

  return (
    <>
      <View style={getCafeTableStyle.container}>
        <View style={getCafeTableStyle.imageContainer}>
          <View style={getCafeTableStyle.image}>
            <Image
              source={{ uri: cafeLogoImage }}
              style={getReserveStyle.cafeLogo}
            />
          </View>
        </View>
        <View style={getCafeTableStyle.contentContainer}>
          <View style={getCafeTableStyle.textContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
            <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default ReservationScreen;
