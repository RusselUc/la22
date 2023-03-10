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
  const [lastMeat, setLastMeat] = useState({});
  const [dayId, setDayId] = useState("");
  const [dayIdMeat, setDayIdMeat] = useState("");
  const [allAmount, setAllAmount] = useState(0);
  const [allAmountMeat, setAllAmountMeat] = useState(0);
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

  const addProductMeat = async () => {
    const docRef = await addDoc(collection(db, "carnes"), {
      platillo: 0,
      media: 0,
      kilo: 0,
      libre: 0,
      dayOpen: true,
      date: serverTimestamp(),
    });
  };

  const addNewBill = async (name, amount) => {
    const docRef = await addDoc(collection(db, "gastos"), {
      name,
      amount,
      date: serverTimestamp(),
    });
  };

  const addNewBillMeat = async (name, amount) => {
    const docRef = await addDoc(collection(db, "gastosCarnes"), {
      name,
      amount,
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

  const closeDayMeat = async () => {
    const itemRef = doc(db, "carnes", dayId);
    await updateDoc(itemRef, {
      ...lastMeat,
      dayOpen: !lastMeat.dayOpen,
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

  const saledMeat = () => {
    let sal = 0;
    for (let clave in lastMeat) {
      if (clave !== "dayOpen" && clave !== "date") {
        sal = sal + lastMeat[clave];
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
    const qm = query(
      collection(db, "carnes"),
      orderBy("date", "desc"),
      limit(1)
    );
    const unsubscribemeat = onSnapshot(qm, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        setDayIdMeat(doc.id);
        setLastMeat(doc.data());
      });
    });
  }, []);
  return (
    <MicheladaContext.Provider
      value={{allAmountMeat,setAllAmountMeat,lastMeat,dayIdMeat, setLastMeat, addNewBillMeat, closeDayMeat, saledMeat, lastProduct, addProduct, dayId, setDayId, saled, closeDay, addNewBill, setAllAmount, allAmount, addProductMeat }}
    >
      {children}
    </MicheladaContext.Provider>
  );
};

export default MicheladaProvider;
