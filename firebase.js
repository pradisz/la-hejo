import Constants from "expo-constants";
import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp(Constants.manifest.extra.firebase);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
