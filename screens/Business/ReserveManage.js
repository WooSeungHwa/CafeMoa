import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottomSheet from "../../Components/BottomSheet";

import getManageStyle from "../../styles/screens/ReserveManageStyle";
import { dbService } from "../../FireServer";
import { ReservationService } from "../../lib/ReservationService";
import { UserDataService } from "../../lib/UserDataService";

function ReserveManageScreen({ navigation, route }) {
  const { cafeData: cafeData, userData: userData } = route.params;
  const [selectedSeat, setSelectedSeat] = useState("");
  const [reserveService, setReserveService] = useState();
  const [nowTime, setNowTime] = useState(12 /*new Date().getHours()*/);
  const [timeTableList, setTimeTableList] = useState();
  const [loadPage, setLoadPage] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedReserveSeat, setSelectedReserveSeat] = useState();

  useEffect(() => {
    const reves = new ReservationService(cafeData.getSeatId());
    dbService
      .collection("Seat")
      .doc(cafeData.getSeatId())
      .onSnapshot(async () => {
        await reves.loadSeatDataBase();
        setReserveService(reves);
      });
  }, []);

  useEffect(() => {

  }, [route?.seatData]);

  const pressButton = (time, seat) => {
    setSelectedReserveSeat({ time, seat });
    setModalVisible(true);
  };

  /** 배정 */
  const AssignmentConfirm = async () => {
    console.log("배정", selectedReserveSeat);
    const data = selectedReserveSeat;
    const fd = await reserveService.assignmentSeats(data.time, data.seat.seat);
    dbService
      .collection("User")
      .doc(data.seat.uid)
      .update({
        reservation: {
          state: true,
        },
      });
    setLoadPage(fd);
  };

  /** 예약 취소 */
  const ReservationCancel = async () => {
    const data = selectedReserveSeat;
    const user = new UserDataService(data.seat.uid);
    const fd = await reserveService.doSeatCancel(data.time, data.seat.seat);
    await user.deleteReservationToUser();
    setLoadPage(fd);
  };

  /** 좌석 Show */
  useEffect(() => {
    if (reserveService == null) {
      return;
    }
    const { open: op, close: cl } = reserveService;
    const arr = [];
    for (var i = nowTime; i < cl; i++) {
      arr.push(<TimeTable key={i} time={i} />);
    }
    setTimeTableList(arr);
  }, [, reserveService, loadPage]);

  /** 시간 라벨 */
  function TimeTable({ time }) {
    const [seatList, setSeatList] = useState([]);

    useEffect(() => {
      const seats = reserveService.getSeatDataOnTimeReserve(time, false);
      const list = seats.map((data, index) => {
        return <SeatLabel key={index} seat={data} />;
      });
      setSeatList(list);
    }, [, reserveService, loadPage]);

    /** 좌석 */
    const SeatLabel = ({ seat }) => (
      <TouchableOpacity
        style={getManageStyle.setNumBox}
        onPress={() => {
          pressButton(time, seat);
        }}
      >
        <Text style={{ color: "#001D44" }}>{`${seat.seat}번 좌석`}</Text>
      </TouchableOpacity>
    );
    return (
      <>
        <View style={getManageStyle.timeArea}>
          <Text style={getManageStyle.timeText}>{time}시</Text>
        </View>
        <ScrollView horizontal={true} style={getManageStyle.numContainer}>
          {seatList}
        </ScrollView>
      </>
    );
  }

  return (
    <ScrollView style={getManageStyle.container}>
      <BottomSheet
        modalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        reserveSeat={selectedReserveSeat}
        AssignmentConfirm={AssignmentConfirm}
        ReservationCancel={ReservationCancel}
      />
      <ScrollView>{timeTableList}</ScrollView>
    </ScrollView>
  );
}

export default ReserveManageScreen;
