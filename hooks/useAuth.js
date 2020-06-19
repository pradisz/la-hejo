import React, { createContext, useContext, useState, useEffect } from "react";
import * as Google from "expo-google-app-auth";
import firebase from "../firebase";
import { auth } from "firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [currentUser, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isUpdating, setUpdating] = useState(false);

  const isGoogleUserEqual = (googleUser, firebaseUser) => {
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
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isGoogleUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            const userRef = firebase.firestore().collection("users");
            const { isNewUser } = result.additionalUserInfo;
            const { uid, displayName, email, photoURL } = result.user;

            if (isNewUser) {
              userRef
                .doc(uid)
                .set({
                  uid,
                  displayName,
                  email,
                  photoURL,
                  date_joined: Date.now(),
                })
                .then(() => {
                  console.log("Document successfully written!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            } else {
              userRef.doc(uid).update({
                last_login: Date.now(),
              });
            }
          })
          .catch((error) => {
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
        // console.log("User already signed-in Firebase.");
      }
    });
  };

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "781851522642-b2hptkrgapmoolc493j2t5cu7qvfeert.apps.googleusercontent.com",
        iosClientId:
          "781851522642-a5foaagih8ktil596da49a5scrlahor8.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setLoading(true);
        setTimeout(async () => {
          await onSignInGoogle(result);
        }, 1000);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const editProfile = (displayName, image) => {
    const userAuth = firebase.auth().currentUser;
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid);

    setUpdating(true);
    if (image) {
      return uploadImageAsync(image).then((photoURL) => {
        return userAuth
          .updateProfile({ displayName, photoURL })
          .then(() => {
            usersRef
              .set({ displayName, photoURL }, { merge: true })
              .then(() => console.log("Profile updated successfully!"))
              .catch((error) => console.error(error));
          })
          .catch((error) => console.error(error));
      });
    } else {
      return userAuth
        .updateProfile({ displayName })
        .then(() => {
          usersRef
            .set({ displayName }, { merge: true })
            .then(() => {
              console.log("Profile updated successfully!");
              setUpdating(false);
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    }
  };

  const uploadImageAsync = async (uri) => {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const path = `users/${new Date().getTime()}_${currentUser.uid}`;

    const ref = firebase.storage().ref(path);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  };

  const signOut = async () => {
    setLoading(true);
    setTimeout(async () => {
      await firebase.auth().signOut();
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return {
    currentUser,
    isLoading,
    isUpdating,
    signInWithGoogle,
    editProfile,
    signOut,
  };
};
