import { initializeApp,get } from 'firebase/app';
import { getDatabase, ref, push, } from 'firebase/database'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD-VkTeQQ-3OxHxn6UGFGjAhvuzcip976Y",
    authDomain: "naaz-apps.firebaseapp.com",
    databaseURL: "https://naaz-apps-default-rtdb.firebaseio.com",
    projectId: "naaz-apps",
    storageBucket: "naaz-apps.appspot.com",
    messagingSenderId: "654346992756",
    appId: "1:654346992756:web:a0c266398f5f5d7b80e521",
    measurementId: "G-3S0ZC4T2HX"
}

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDb = getDatabase(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);