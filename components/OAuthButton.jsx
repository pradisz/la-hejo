import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

import { BodyText } from "./Text";

const OAuthButton = ({ google }) => {
  const { navigate } = useNavigation();

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignInGoogle = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      });
  };

  const signInAsyncGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "781851522642-b2hptkrgapmoolc493j2t5cu7qvfeert.apps.googleusercontent.com",
        iosClientId:
          "781851522642-a5foaagih8ktil596da49a5scrlahor8.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        navigate("splash");
        onSignInGoogle(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <TouchableOpacity
      onPress={google && signInAsyncGoogle}
      style={styles.container}
    >
      <View style={{ marginHorizontal: 15 }} />
      <Image
        source={
          google
            ? require("../assets/images/google.png")
            : require("../assets/images/facebook.png")
        }
        style={styles.icon}
      />
      <BodyText center style={{ flex: 1 }}>
        Continue with {google ? "Google" : "Facebook"}
      </BodyText>
      <View style={{ marginHorizontal: 15 }} />
    </TouchableOpacity>
  );
};

export default OAuthButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
