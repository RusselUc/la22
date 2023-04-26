import { useContext, useState } from "react";
import tamarindo from "../assets/img/tamarindo.png";
import fresa from "../assets/img/fresa.png";
import pina from "../assets/img/pina.png";
import mango from "../assets/img/mango.png";
import clamato from "../assets/img/jugo-de-tomate.png";
import clasica from "../assets/img/michelada.png";
import ItemProduct from "../components/ItemProduct";
import Modal from "../components/Modal";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import ContentMiche from "../components/ContentMiche";
import { MicheladaContext } from "../context/MicheladaProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "../components/Loading";

const Miches = () => {
  const [open, setOpen] = useState(false);
  const [openGlass, setOpenGlass] = useState(false);
  const [load, setLoad] = useState(false);
  const [glass, setGlass] = useState(0);
  const [item, setItem] = useState(null);
  const { dayId, lastProduct, saled } = useContext(MicheladaContext);

  const updateItem = async () => {
    await setLoad(true)
    const itemRef = doc(db, "productos", dayId);
    await updateDoc(itemRef, {
      ...lastProduct,
      initialGlass: lastProduct.initialGlass + glass,
    });
    setOpenGlass(!openGlass);
    await setLoad(false)
  };
  const navigate = useNavigate();
  const products = [
    {
      id: "fresa",
      name: "Fresa",
      img: fresa,
    },
    {
      name: "Tamarindo",
      img: tamarindo,
    },
    {
      name: "Piña",
      img: pina,
    },
    {
      name: "Mango",
      img: mango,
    },
    {
      name: "Clamato",
      img: clamato,
    },
    {
      name: "Clasica",
      img: clasica,
    },
  ];

  const openModal = (product) => {
    setItem(product);
    setOpen(true);
  };
  return (
    <div className="flex h-screen flex-col gap-10 bg-[#f6f7ff]">
      <span className="flex items-center justify-between bg-[#526dff] px-1">
        <div className="cursor-pointer px-4" onClick={() => navigate("/")}>
          <UilArrowLeft className="h-10 w-10 text-white" />
        </div>
        <h2 className="my-5 text-center text-4xl font-light text-white">
          Micheladas
        </h2>
        <button
          className="rounded-lg bg-[#3cd49f] p-1"
          onClick={() => setOpenGlass(true)}
        >
          Agregar vasos
        </button>
      </span>
      <div className="flex justify-around">
        <div className="text-center text-xl">Vendidos: {saled()}</div>
        <div className="text-center text-xl">
          Vasos restantes: {lastProduct.initialGlass - saled()}
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-10 p-5">
        {products.map((product) => (
          <ItemProduct
            key={product.name}
            name={product.name}
            image={product.img}
            openModal={() => openModal(product)}
          />
        ))}
      </div>

      {open && (
        <Modal setOpen={setOpen}>
          <ContentMiche product={item} setOpen={setOpen} setLoad={setLoad}/>
        </Modal>
      )}

      {openGlass && (
        <Modal setOpen={setOpenGlass}>
          <div className="flex w-full flex-col p-10">
            <p>Ingrese cantidad de vasos nuevos: </p>
            <input
              className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
              type="number"
              placeholder="0"
              onChange={(e) => setGlass(Number(e.target.value))}
            />
            <button
              className="mt-5 flex w-full items-end justify-center rounded-md bg-[#506eff] text-white"
              onClick={() => updateItem()}
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

export default Miches;
