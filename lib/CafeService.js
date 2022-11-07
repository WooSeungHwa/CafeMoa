import { dbService, FileUpdate, MyDatabase } from '../FireServer';
import { CafeData } from './CafeData';
import { List } from './DataStructure/List';
import { PriorityQueue, Queue } from './DataStructure/Queue';
import { getImage, pickImage } from './ImageService';
import { getAddressFromLocation } from './LocationService';
import { createNewSeatData } from './ReservationService';

const CafeDatabase = dbService.collection("CafeData");
const LocationDatabase = dbService.collection("Location");

class CafeService{
    constructor(){

    }
    

}


/*__________________________________________________________________________ */
/** 데이터베이스에 데이터 추가 */
export async function addCafeDatabase(_data){
    if(_data === null || _data.name === null || _data.location === null){
        console.log("정보가 부족합니다!");
        return;
    }
    let cafe_datas = new CafeData();
    cafe_datas = _data;

    cafe_datas.adress = (cafe_datas.adress == null) ? await getAddressFromLocation(_data.location) : cafe_datas.adress;
    let data = ((await serchNearestCafe(_data.location,cafe_datas.adress)).heap);
    data.shift();
    cafe_datas.network = data;
    cafe_datas.seat = await createNewSeatData(cafe_datas.getOpenTime(), cafe_datas.getCloseTime());
    console.log(cafe_datas.getName())
    var id = await CafeDatabase.add({
        name: cafe_datas.getName(),
        location: cafe_datas.getLocation(),
        adress: cafe_datas.getAdressArray(),
        count: cafe_datas.getSeatCount(),
        seatId: cafe_datas.getSeatId(),
        
        time: {
            open: cafe_datas.getOpenTime(),
            close: cafe_datas.getCloseTime(),
        }

    }).catch((err)=>{
        console.log("서버에 데이터를 저장하지 못했습니다 :", err)
    })

    //이미지 업로드
    if(cafe_datas.getLogo() != null){
        await pickImage(id.id,"logo")
    }
    if(cafe_datas.getSeatImage() != null){
        await pickImage(id.id,"seatImage")
    }

    //인접 데이터 세팅
    insertDataInLocation(cafe_datas.adress,cafe_datas.location,id.id,cafe_datas.network);
    if(data != false){
        cafe_datas.network.forEach(element => {
            updateCafeNetwork(element, id.id);
        });
    }
    console.log("카페 업로드") 
}



/** 지역정보에 카페 아이디 등록 */
export async function insertDataInLocation(_city, _loc, _id,_net){
    const {city1:c1,city2:c2} = _city;
    const {latitude,longitude} = _loc;
    await LocationDatabase.doc(c1).collection(c2).doc(_id).set({
        id: _id,
        location:{
            latitude: latitude,
            longitude: longitude,
        },
        network: _net,
    }).catch((err)=>{
        console.log("지역정보를 갱신하는데 문제가 발생했습니다.",err);
    })
}

/** 인접 카페 정보 (그래프 노드) 업데이트 */
async function updateCafeNetwork(_setid, _id){
    var city;
    await CafeDatabase.doc(_setid).get().then((doc)=>{
        if(doc.exists){
            city = doc.data().adress
        }
    })
    await LocationDatabase.doc(city.city1).collection(city.city2).doc(_setid).update({
        network : MyDatabase.firestore.FieldValue.arrayUnion(_id),
    })
}

/** 거리계산 */
function getDistance(point_from, point_to){
    return (Math.abs(point_from.latitude-point_to.latitude)+Math.abs(point_from.longitude-point_to.longitude))
}

/*__________________________________________________________________*/
export async function getCafeDatabase3(){
    //let location = (_loc == null) ? await getGeoLocation() : _loc; //
    let location = {latitude: 37.25894 ,longitude: 127.19069}
    let current_adress =  {city1: "경기도" , city2: "용인시", city3:"처인구"} //(_city == null) ? await getAddressFromLocation(location) : _city; ///////////////////////////////////////////////////////////
    let queue = (await serchNearestCafe(location,current_adress)).allList();
    let dataList = await bfsSerch2(queue,2);
    console.log(dataList);
    return dataList;
}

async function bfsSerch2(list,max){
    let cafeDataList = new List(); //최종적으로 반환할 카페 데이터 List
    let queue = new Queue(); //너비탐색 Queue 
    let finded = new List();
    
    queue.push(true);
    list.forEach((item)=>{
        queue.push(item);
    })
    console.log(queue)
    //queue.push();
    //while(!queue.isEmpty()){
    
    while(queue.isEmpty()){
        let current_node = queue.front();
        let current_network = new Array();
        current_network = current_node.network //주변 카페 ID 리스트
        
        current_network.forEach((item)=>{
            finded
        })
        

        // 현제 노드찾기
        // 만약 노드가 없다면? // 다른 지역 id 에서 추가 // 만약 지역이 다르다면? //다른 지역에서 데이터 추출


    }

    const promises = finded.map(async (id) => {
        const item = await getCafeData(id) 
        cafeDataList.push(item);
    });
    await Promise.all(promises);

    return cafeDataList.getArray();
}

/** 데이터 배이스에서 카페정보를 배열로 리턴 : ( _loc : 위치데이터, 주소 )*/
export async function getCafeDatabase(_loc, _city){
    //let location = (_loc == null) ? await getGeoLocation() : _loc; /////////////////////////////////////////////////////////////
    let location = {latitude: 37.25894 ,longitude: 127.19069}
    let current_adress =  {city1: "경기도" , city2: "용인시", city3:"처인구"} //(_city == null) ? await getAddressFromLocation(location) : _city; ///////////////////////////////////////////////////////////
    let queue = await serchNearestCafe(location,current_adress);
    return bfsSerch(queue);
}

/** 지역 정보로 간단히 가져오기 */
export async function getCafeDatabaseAd(_loc){
    //let location = (_loc == null) ? await getGeoLocation() : _loc; /////////////////////////////////////////////////////////////
    let location = {latitude: 37.25894 ,longitude: 127.19069}
    let current_adress =  {city1: "경기도" , city2: "용인시", city3:"처인구"} //(_city == null) ? await getAddressFromLocation(location) : _city; ///////////////////////////////////////////////////////////
    let LocalCafeData = [];
    let datas = await LocationDatabase.doc(current_adress.city1).collection(current_adress.city2).get();
    let idDoc = []
    datas.forEach(item => {
        idDoc.push(item.id)
    });
    const promises = idDoc.map(async (id) => {
        const item = await getCafeData(id) 
        LocalCafeData.push(item);
    });
    await Promise.all(promises);

    return LocalCafeData;
}

/** 현 포인트에서 가장 가까운 카페 탐색*/
async function serchNearestCafe(_loc,_city){
    let p_queue = new PriorityQueue();
    let location = _loc, city = _city;
    if(location == null){
        console.log("도시정보 없음")
        location = getAddressFromLocation(_loc);
    }
    await LocationDatabase.doc(city.city1).collection(city.city2).get().then((docs)=>{
        docs.forEach((doc)=>{
            if(doc.exists){
                var data = doc.data();
                var distance = getDistance(data.location,location);
                if(distance < 0.08){
                    p_queue.push(data.id)
                }
            }
        })
    }).catch((err)=>{
        console.log("데이터를 불러 오는데 실패했습니다 : ", err);
    });

    return p_queue;
}


// 너비 그래프 탐색 : ( array:  , numer: 최대숫자 ) 
export async function bfsSerch(start_queue, max){
    let cafe_datas = new List();
    let cafe_list = new List();
    let cafe_queue = new Queue();
    if(max == null) max = 50;

    while(!start_queue.isEmpty()){
        var start_id = start_queue.pop();
        cafe_list.push(start_id);
        cafe_queue.push(start_id);
        await CafeDatabase.doc(start_id).get().then((data)=>{
            cafe_datas.push(data.data());
        });
    }

    //const find = "2z0aFnmkcCIQhasyJAgC"
    /*
    while(!cafe_queue.isEmpty() && cafe_list.length() <= max ){
        console.log(cafe_queue.length());
        var current_node = cafe_queue.front(); 
        var current_node_network_list = await (await CafeDatabase.doc(current_node).get()).data().network
        current_node_network_list.forEach((data) =>{
            console.log(cafe_list.nodes.find((element)=>{
                if(element == )

            }));
        })
    }
    */
   console.log("데이터 로드 성공");
    return cafe_datas.nodes;
}

/** 단일 카페데이터 */
export async function getCafeData(cafe_id){
    let cafe_data = new CafeData();
    await CafeDatabase.doc(cafe_id).get().then(async(data)=>{
        const cafe = new CafeData();
        cafe.loadData(data.data())
        cafe.id = cafe_id;
        if(cafe_id != null){
            cafe.setLogoImage(await getImage(cafe_id,"logo"));
            cafe.setSeatImage(await getImage(cafe_id, "seatImage"));
        }
        cafe_data = cafe
    });
    return cafe_data;
}