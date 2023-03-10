import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { UilArrowLeft, UilPlus } from "@iconscout/react-unicons";
import { MicheladaContext } from "../context/MicheladaProvider";
import DataTable from "react-data-table-component";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const BillsC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  const { addNewBillMeat, setAllAmountMeat } = useContext(MicheladaContext);

  const [data, setData] = useState([]);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
    },
    {
      name: "Cantidad",
      selector: (row) => row.amount,
    },
  ];

  const addBill = () => {
    setOpen(true);
  };

  const handle = async (e) => {
    e.preventDefault();
    await addNewBillMeat(name, amount);
    setOpen(false);
  };

  const isValid = () => {
    return amount > 0 && name.length > 0;
  };

  useEffect(() => {
    const q = query(collection(db, "gastosCarnes"));
    const getChats = () => {
      const unsub = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        let amount = 0;
        querySnapshot.forEach((doc) => {
          if (
            doc.data().date.toDate().toDateString() ===
            new Date().toDateString()
          ) {
            cities.push(doc.data());
            amount = amount + doc.data().amount;
          }
        });
        setAllAmountMeat(amount);
        cities.push({ name: "Total", amount: amount });
        setData(cities);
      });
    };

    getChats();
  }, []);
  return (
    <div className="flex h-screen flex-col gap-10 bg-[#f6f7ff]">
      <span className="flex items-center justify-between bg-[#526dff] pr-5">
        <div className="cursor-pointer px-5" onClick={() => navigate("/")}>
          <UilArrowLeft className="h-10 w-10 text-white" />
        </div>
        <h2 className="my-5 text-center text-4xl font-light text-white">
          Gastos
        </h2>
        <button
          onClick={() => addBill()}
          className="flex rounded-xl bg-[#38d79f] text-white"
        >
          <UilPlus className="h-10 w-10" />
        </button>
      </span>

      <DataTable className="p-5" columns={columns} data={data} />

      {open && (
        <Modal setOpen={setOpen}>
          <div className="flex flex-col gap-5 p-10">
            <span className="text-center font-semibold">
              Agregar nuevo gasto
            </span>
            <form className="flex flex-col gap-5" onSubmit={handle}>
              <input
                className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
                type="text"
                placeholder="Nombre del gasto"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
                type="number"
                placeholder="$ 0.00"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button
                disabled={!isValid()}
                type="submit"
                className={`${
                  !isValid() ? "bg-blue-300" : "bg-[#526dff]"
                } mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto`}
              >
                Aceptar
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BillsC;
