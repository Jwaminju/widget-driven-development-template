import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../configs/firebase.config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { PERSON_ITEMS } from "../data/items/personal_item";


export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp, 'gs://green-5be28.appspot.com/');
const images = ['']

// export class Storage {
//     // 클래스 프로퍼티를 사전 선언하여야 한다
//     firebaseApp: any;
//     storage: any;
//     images: string[];

//     constructor() {
//       // 클래스 프로퍼티수에 값을 할당
//       this.firebaseApp = initializeApp(firebaseConfig);
//       this.storage = getStorage(this.firebaseApp, 'gs://green-5be28.appspot.com/');
//       this.images = ['']
//     }

//     useFirebaseImage=()=> { // 1개의 img url을 가져옴 -> 파이어베이스 관련 훅 
//         let images = [''];
//         for (let i in PERSON_ITEMS) {
//             const pathReference = ref(this.storage, '/itemsImg'+PERSON_ITEMS[i].ima_tag);
//             getDownloadURL(pathReference).then((url:string) => { // fluent api x (try catch가 깔끔)
//                 images.push(url)
//                 // PERSON_ITEMS[i].img=url
//                 console.log("GET success", url)
    
//             })
//             .catch((error) => {
//                 console.log("firebase GET image error")
//             });
//         }
//         this.images=images;
//     }
  
//     walk() {
//       //console.log(`${this.name} is walking.`);
//     }

//     setItemsImageURL() {
//         this.useFirebaseImage();
//         for (let i in this.images) {
//             PERSON_ITEMS[i].img = this.images[i]
//         }
//         console.log("GET images ->:", PERSON_ITEMS);

//     }
// }

  
export const useFirebaseImage = () => { // 1개의 img url을 가져옴 -> 파이어베이스 관련 훅 
    // const [url, setUrl] = useState(''); // hook 안 state 도 .. 
    // const getImage = (imagePath:string) => {

    // 이미지를 전체를 받아와서 저장을 해둠 -> state <state가 바뀐 때 다른 걸 렌더링> -> 한 번만 받아옴 우린 -> state를 안 써도 됨
    // useReference ? <한 번만 전체를 getDownlurl>
    // local 변수 
    // imagePath
    
    let images = [''];
    // useEffect(()=>{
        for (let i in PERSON_ITEMS) {
            const pathReference = ref(storage, '/itemsImg'+PERSON_ITEMS[i].ima_tag);
            getDownloadURL(pathReference).then((url:string) => { // fluent api x (try catch가 깔끔)
                images.push(url)
                // PERSON_ITEMS[i].img=url
                console.log("GET success", url)
    
            })
            .catch((error) => {
                console.log("firebase GET image error")
            });
        }
        console.log("SET PERSON_ITEMS[0]:", PERSON_ITEMS)
    // }
    // )
   
    return images;

}

// const setItemsImageURL = () => {
//     const image = useFirebaseImage();
//     console.log("GET images:", images)
//     for (let i in images) {
//         PERSON_ITEMS[i].img = images[i]
//     }
// }

// const images = useRef(['']);

// const getImages = () => {
//     for (let img of image){
//         images.current = [...images.current, img]
//     }
// }
