import { useContext, useState } from "react";
import asado from "../assets/img/asado.png"
import platillo from "../assets/img/carne.png";
import filete from "../assets/img/filete.png";
import tostar from "../assets/img/tostar.png";

import ItemProduct from "../components/ItemProduct";
import Modal from "../components/Modal";
import { UilArrowLeft } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import ContentMiche from "../components/ContentMiche";
import { MicheladaContext } from "../context/MicheladaProvider";
import ContentMeat from "../components/ContentMeat";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Carnes = () => {
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [item, setItem] = useState(null);
  const { lastMeat, dayIdMeat } = useContext(MicheladaContext)
  const navigate = useNavigate()
  const products = [
    {
      name: "Platillo",
      img: platillo,
    },
    {
      name: "Media",
      img: filete,
    },
    {
      name: "Kilo",
      img: asado,
    },
    // {
    //   name: "Libre",
    //   img: tostar,
    // },
  ];

  const handle = async (e) => {
    e.preventDefault();
    const itemRef = doc(db, "carnes", dayIdMeat);
    await updateDoc(itemRef, {
        ...lastMeat,
        libre: lastMeat.libre + amount
    })
    setOpenL(false);
  };

  const isValid = () => {
    return amount > 0 ;
  };


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
        <h2 className="my-5 text-4xl font-light text-white text-center w-1/2">Carnes</h2>
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
        <ItemProduct name="Libre" image={tostar} openModal={()=>setOpenL(true)}/>
      </div>
      {openL && (
        <Modal setOpen={setOpenL}>
          <div className="flex flex-col gap-5 p-10">
            <span className="text-center font-semibold">
              Agregar cantidad en pesos
            </span>
            <form className="flex flex-col gap-5" onSubmit={handle}>
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
      {open && <Modal setOpen={setOpen}>
        <ContentMeat product={item} setOpen={setOpen}/>
        </Modal>}
    </div>
  );
};

export default Carnes;
