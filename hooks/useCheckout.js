import { useState, useEffect } from "react";
import firebase from "../firebase";

import { useAuth } from "./useAuth";

export const useCheckout = () => {};

export const useAddress = () => {
  const { currentUser } = useAuth();
  const [shipping, setShipping] = useState(null);
  const [isFetching, setFetching] = useState(false);

  const editAddress = (recipient, contact, address) => {
    const usersRef = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid);

    const shipping = { recipient, contact, address };

    return usersRef
      .set({ shipping }, { merge: true })
      .then(() => console.log("Shipping address updated successfully!"))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setFetching(true);
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { shipping } = doc.data();
          setShipping(shipping);
          setFetching(false);
        }
      });

    return () => unsubscribe;
  }, []);

  return { shipping, isFetching, editAddress };
};
