import React, { useContext, useState } from "react";
import miches from "../assets/img/miche.png";
import caja from "../assets/img/cajero-automatico.png";
import gastos from "../assets/img/gastos.png";
import portapapeles from "../assets/img/portapapeles.png";
import { useNavigate } from "react-router-dom";
import { MicheladaContext } from "../context/MicheladaProvider";
import Modal from "../components/Modal";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
const Home = () => {
  const navigate = useNavigate();
  const { lastProduct, addProduct } = useContext(MicheladaContext);
  const [open, setOpen] = useState(false);
  const [initialSaled, setInitialSaled] = useState(0);
  const [initialGlass, setInitialGlass] = useState(0);

  const newDay = async (initialSaledm, initialGlass) => {
    await addProduct(initialSaled, initialGlass)
    setOpen(false)
  }
  return (
    <div className="flex h-screen flex-col gap-10 bg-[#f6f7ff]">
      <span className="flex items-center justify-around bg-[#526dff]">
        <h2 className="my-5 text-4xl font-light text-white">Menú</h2>
        <label
          className={`flex h-8  w-20  items-center justify-center rounded-full text-white ${
            lastProduct.dayOpen ? "bg-green-300" : "bg-[#ff5f93]"
          }`}
        >
          {lastProduct.dayOpen ? "Abierto" : "Cerrado"}
        </label>
        {!lastProduct.dayOpen && (
          <button
            className="rounded-lg bg-[#3cd49f] p-2 text-white"
            onClick={() => setOpen(true)}
          >
            Nuevo día
          </button>
        )}
      </span>
      {lastProduct.dayOpen ? (
        <div className="flex flex-wrap items-center justify-around gap-10 p-5">
          <div
            onClick={() => navigate("/micheladas")}
            className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3"
          >
            <img src={miches} className="h-14 w-14" />
            <span>Micheladas</span>
          </div>
          <div className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3">
            <img src={portapapeles} className="h-14 w-14" />
            <span>Pendientes</span>
          </div>
          <div onClick={() => navigate("/caja")} className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3">
            <img src={caja} className="h-14 w-14" />
            <span>Caja</span>
          </div>
          <div onClick={() => navigate("/gastos")} className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3">
            <img src={gastos} className="h-14 w-14" />
            <span>Gastos</span>
          </div>

          <button className="bg-[#ff5f93] text-white h-10 p-2 rounded-lg " onClick={() => signOut(auth)}>Cerrar sesión</button>
        </div>
      ) : (
        <p className="flex h-full items-center justify-center text-xl">
          Es necesario crear un nuevo día
        </p>
      )}
      {open && (
        <Modal setOpen={setOpen}>
          <div className="flex w-full flex-col p-10">
            <h1 className="text-lg font-bold">¿Abrir nuevo día?</h1>
            <p>Ingrese la cantidad de efectivo con el que inicia la caja: </p>
            <input
              className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
              type="number"
              placeholder="$ 0.00"
              onChange={(e) => setInitialSaled(Number(e.target.value))}
            />
            <p>Vasos iniciales: </p>
            <input
              className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
              type="number"
              placeholder="0"
              onChange={(e) => setInitialGlass(Number(e.target.value))}
            />
            <button
              className="mt-5 flex w-full items-end justify-center rounded-md bg-[#506eff] text-white"
              onClick={() => newDay(initialSaled, initialGlass)}
            >
              Aceptar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
