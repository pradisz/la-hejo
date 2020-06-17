import { useState, useEffect } from "react";
import firebase from "../firebase";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("products")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(() => {
          const updatedProducts = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          );
          setProducts(updatedProducts);
        });
      });

    return () => unsubscribe;
  }, []);

  return { products };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("products")
      .doc(productId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const updatedProduct = doc.data();
          setProduct(updatedProduct);
        }
      });

    return () => unsubscribe;
  }, []);

  return { product };
};
