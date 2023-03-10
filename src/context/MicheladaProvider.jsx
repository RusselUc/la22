import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase";

export const MicheladaContext = createContext();

const MicheladaProvider = ({ children }) => {
  const [lastProduct, setLastProduct] = useState({});
  const [dayId, setDayId] = useState("");
  const addProduct = async () => {
    const docRef = await addDoc(collection(db, "productos"), {
      fresa: 0,
      pina: 0,
      clasica: 0,
      mango: 0,
      tamarindo: 0,
      clamato: 0,
      dayOpen: true,
      date: serverTimestamp(),
    });
  };

  const closeDay = async () => {
    const itemRef = doc(db, "productos", dayId);
    await updateDoc(itemRef, {
      ...lastProduct,
      dayOpen: !lastProduct.dayOpen,
    });
  };

  const saled = () => {
    let sal = 0;
    for (let clave in lastProduct) {
      if (clave !== "dayOpen" && clave !== "date") {
        sal = sal + lastProduct[clave];
      }
    }

    return sal;
  };

  //   const consultar = async () => {
  //     let date = "";
  //     const citiesRef = collection(db, "productos");
  //     const q = query(citiesRef, orderBy("date", "desc"), limit(1));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       setLastProduct(doc.data());
  //       date = doc.data().date.toDate().toDateString();
  //     });
  //     return date;
  //   };

  //   const currentDate = async () => {
  //     const dateServer = await consultar();
  //     if (dateServer !== new Date().toDateString()) {
  //       console.log("Se necesita crear un nevo día");
  //     } else {
  //       console.log("Ya existe una fecha");
  //       // await addProduct()
  //     }
  //   };

  useEffect(() => {
    const q = query(
      collection(db, "productos"),
      orderBy("date", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        setDayId(doc.id);
        setLastProduct(doc.data());
      });
    });
  }, []);
  return (
    <MicheladaContext.Provider
      value={{ lastProduct, addProduct, dayId, setDayId, saled, closeDay }}
    >
      {children}
    </MicheladaContext.Provider>
  );
};

export default MicheladaProvider;
