import React, { useContext, useState } from "react";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { MicheladaContext } from "../context/MicheladaProvider";
import DataTable from "react-data-table-component";
import Modal from "../components/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";

const Saled = () => {
  const navigate = useNavigate();
  const [initialSaled, setInitialSaled] = useState(0);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const { lastProduct, saled, closeDay, allAmount, dayId } =
    useContext(MicheladaContext);

  const columns = [
    {
      name: "Michelada",
      selector: (row) => row.michelada,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
    },
  ];

  const data = [
    {
      id: 1,
      michelada: "Fresa",
      cantidad: lastProduct.fresa,
    },
    {
      id: 2,
      michelada: "Piña",
      cantidad: lastProduct.pina,
    },
    {
      id: 3,
      michelada: "Tamarindo",
      cantidad: lastProduct.tamarindo,
    },
    {
      id: 4,
      michelada: "Mango",
      cantidad: lastProduct.mango,
    },
    {
      id: 5,
      michelada: "Clamato",
      cantidad: lastProduct.clamato,
    },
    {
      id: 6,
      michelada: "Clasica",
      cantidad: lastProduct.clasica,
    },
    {
      id: 7,
      michelada: "Total + saldo inicial",
      cantidad:
        (saled() - lastProduct.clasica) * 40 +
        lastProduct.clasica * 45 +
        lastProduct.initialSaled,
    },
    {
      id: 8,
      michelada: "Total - gastos",
      cantidad:
        (saled() - lastProduct.clasica) * 40 +
        lastProduct.clasica * 45 +
        lastProduct.initialSaled -
        allAmount,
    },
  ];

  const updateInitialSaled = async () => {
    setLoad(true)
    const itemRef = doc(db, "productos", dayId);

    await updateDoc(itemRef, {
      ...lastProduct,
      initialSaled: lastProduct.initialSaled + initialSaled,
    });

    setOpen(!open)
    setLoad(false)
  };

  const toHome = () => {
    closeDay();
    navigate("/");
  };
  return (
    <div className="flex h-screen flex-col gap-10 bg-[#f6f7ff]">
      <span className="flex items-center bg-[#526dff]">
        <div
          className="w-1/3 cursor-pointer px-5"
          onClick={() => navigate("/")}
        >
          <UilArrowLeft className="h-10 w-10 text-white" />
        </div>
        <h2 className="my-5 w-1/2 text-center text-4xl font-light text-white">
          Caja
        </h2>
      </span>

      <div className="flex justify-center">
        <button
          className="w-max rounded-lg bg-blue-400 p-2 font-semibold text-gray-100"
          onClick={() => setOpen(!open)}
        >
          Modificar saldo inicial
        </button>
      </div>
      <DataTable className="p-5" columns={columns} data={data} />
      <button
        onClick={() => toHome()}
        className="mx-10 rounded-xl bg-[#ff5f93] py-2 text-white"
      >
        Cerrar día
      </button>
      {open && (
        <Modal setOpen={setOpen}>
          <div className="flex w-full flex-col p-10">
            <h1 className="text-lg font-bold">
              ¿Desea modificar el saldo inicial?
            </h1>
            <p>Ingrese la cantidad de efectivo: </p>
            <input
              className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
              type="number"
              placeholder="$ 0.00"
              onChange={(e) => setInitialSaled(Number(e.target.value))}
            />

            <button
              className="mt-5 flex w-full items-end justify-center rounded-md bg-[#506eff] text-white"
              onClick={() => updateInitialSaled()}
            >
              Aceptar
            </button>
          </div>
        </Modal>
      )}
      {load && (
        <Loading/>
      )}
    </div>
  );
};

export default Saled;
