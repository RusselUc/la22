import { useContext, useState } from "react";
import tamarindo from "../assets/img/tamarindo.png"
import fresa from "../assets/img/fresa.png";
import pina from "../assets/img/pina.png";
import mango from "../assets/img/mango.png";
import clamato from "../assets/img/jugo-de-tomate.png";
import clasica from "../assets/img/michelada.png";
import ItemProduct from "../components/ItemProduct";
import Modal from "../components/Modal";
import { UilArrowLeft } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import ContentMiche from "../components/ContentMiche";
import { MicheladaContext } from "../context/MicheladaProvider";

const Miches = () => {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const { lastProduct, saled } = useContext(MicheladaContext)
  const navigate = useNavigate()
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
      <span className="flex items-center bg-[#526dff]">
        <div className="w-1/3 px-5 cursor-pointer" onClick={() => navigate("/")}>
            <UilArrowLeft className="h-10 w-10 text-white"/>
        </div>
        <h2 className="my-5 text-4xl font-light text-white text-center w-1/2">Micheladas</h2>
      </span>
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

      <div className="text-center text-2xl">Vendidos: {saled()}</div>
      {open && <Modal setOpen={setOpen}>
        <ContentMiche product={item} setOpen={setOpen}/>
        </Modal>}
    </div>
  );
};

export default Miches;
