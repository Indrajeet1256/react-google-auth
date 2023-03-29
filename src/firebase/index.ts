// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import config from "./config";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: config.apiKey,
	authDomain: config.authDomain,
	projectId: config.projectId,
	storageBucket: config.storageBucket,
	messagingSenderId: config.messagingSenderId,
	appId: config.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
