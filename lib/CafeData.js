import { dbService } from '../FireServer';
const cafeCollection =  dbService.collection("cafe");

export class CafeData{
    constructor(_name, _brand , _geo_loc, _adress, _number_of_seat, _start_time, _end_time) {
      this.name = _name;
      this.brand = _brand
      this.location = _geo_loc;
      this.adress = _adress;
      this.count = _number_of_seat;
      this.startTime = _start_time;
      this.endTime = _end_time;
      this.network = new Array(); // 인접 그래프 노드
      //아래 예시, 삭제 금지
      //this.seat10 = new TimeTable().insertOneTimeArray(10); //이거 된 거 this.seat.inser~는 안 됨, insert 여기서 실행 안 됨
      //this.seat11 = this.seat.insertOneTimeArray(11);
    }

    /*반드시 get~함수를 사용하여 데이커를 가져와라 아니면 클난다 _________________________________________ */
    /** 이름 */
    getName(){
      return this.name;
    }
    /** 브랜드 (브랜드 가페의 경우 이름이랑 같다 나중을 위한거니 지금은 굳이 필요없다.) */
    getBrand(){
      if(this.name != this.brand)
        return this.brand;
      return null;
    }

    /** 주소 : 시작 번호와 끝 번호를 주어 출력하고 싶은 만큼 출력 (0. 도 | 1.시/군 | 2.동/면/구 | 3~4.상제주소  ) 
    * defalt는 start = 1 end = 2*/
    getAdress(first=1,last=2){
      let adress = "";
      switch(first){
        case 0:
          adress += this.adress.city1 + " "; if(last==0) break;
        case 1:
          adress += this.adress.city2 + " "; if(last==1) break;
        case 2:
          adress += this.adress.city3 + " "; if(last==2) break;
        case 3:
          adress += this.adress.city4; if(last==3) break;
        case 4:
          adress += this.adress.city5; if(last==4) break;
        default: break;
      }
      return adress
    }

    /** 오픈시간 */
    getOpenTime(){
      return this.startTime;
    }

    /** 마감시간 */
    getCloseTime(){
      return this.endTime;
    }

    /** 카페 좌석 */
    getSeatCount(){
      return this.count;
    }
    
    /*_________________________________________________________ */
    setNetwork(_net){
      this.network = _net;
    }

    setSeat(_seat){
      this.seat = _seat;
    }

    addNetwork(_node){
      this.network.push(_node);
    }
}