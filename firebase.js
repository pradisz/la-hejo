import Constants from "expo-constants";
import firebase from "firebase";

import "firebase/firestore";
firebase.initializeApp(Constants.manifest.extra.firebase);

export default firebase;
