import { initializeApp, get } from 'firebase/app';
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

const aonlaFirebaseConfig = {
    "apiKey": "AIzaSyDr_5EvwxXdE_7JXEmmwqzzmEWvcz_INs0",
    "authDomain": "aonla-online.firebaseapp.com",
    "databaseURL": "https://aonla-online.firebaseio.com",
    "projectId": "aonla-online",
    "storageBucket": "aonla-online.appspot.com",
    "messagingSenderId": "588879751981",
    "appId": "1:588879751981:web:92cb3cec66145789df81a4",
    "measurementId": "G-YHCR2GWL73"
}


export async function firebases() {
    let firebaseApp = null
    try {
        firebaseApp = initializeApp(aonlaFirebaseConfig);
    } catch (e) {
        console.log(e)
    }
    const firebaseDb = getDatabase(firebaseApp);
    const firebaseStorage = getStorage(firebaseApp);
    return { firebaseApp, firebaseDb, firebaseStorage }
};

export async function nappsFirebase() {
    let firebaseApp = null
    try {
        firebaseApp = initializeApp(firebaseConfig);
    } catch (e) {
        console.log(e)
    }
    const firebaseDb = getDatabase(firebaseApp);
    const firebaseStorage = getStorage(firebaseApp);
    return { firebaseApp, firebaseDb, firebaseStorage }
};

nappsFirebase()
firebases()

