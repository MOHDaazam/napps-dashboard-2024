import axios from "axios";

// Convert image to Base64
export function imageToBase64(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}



// // Retrieve Base64 image from Firebase Realtime Database
// export function getImageFromFirebase() {
//     return firebase.database().ref('images').once('value')
//         .then(snapshot => {
//             const imageData = snapshot.val().data;
//             return imageData;
//         });
// }

// Convert Base64 image to File object
export function base64ToFile(base64Image) {
    const byteString = atob(base64Image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], "image.jpg", { type: "image/jpeg" });
}

export const pingServer = async (url) => {
    try {
        const startTime = new Date();
        const response = await axios.head(url);
        const endTime = new Date();
        const latency = endTime - startTime;
        if (response.status > 200) {
            return {
                active: true,
                latency: latency
            };
        }
    } catch (error) {
        console.error('Error pinging server:', error.message);
        if (error.message.toLowerCase().includes('network error')) {
            return {
                active: false,
                error: error.message
            };
        } else {
            return {
                active: true,
                latency: 0
            };
        }

    }
};