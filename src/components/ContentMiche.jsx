import React, { useContext, useState } from "react";
import { UilPlus } from "@iconscout/react-unicons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MicheladaContext } from "../context/MicheladaProvider";
import Loading from "./Loading";

const ContentMiche = ({ product, setOpen, setLoad }) => {
  const [addAmount, setAddAmount] = useState(0);
  const { dayId, lastProduct } = useContext(MicheladaContext);
  const updateItem = async () => {
    setLoad(true)
    const itemRef = doc(db, "productos", dayId);
    if (product.name === "Fresa") {
      await updateDoc(itemRef, {
        ...lastProduct,
        fresa: lastProduct.fresa + addAmount,
      });
    } else if (product.name === "Tamarindo") {
      await updateDoc(itemRef, {
        ...lastProduct,
        tamarindo: lastProduct.tamarindo + addAmount,
      });
    } else if (product.name === "Piña") {
      await updateDoc(itemRef, {
        ...lastProduct,
        pina: lastProduct.pina + addAmount,
      });
    } else if (product.name === "Mango") {
      await updateDoc(itemRef, {
        ...lastProduct,
        mango: lastProduct.mango + addAmount,
      });
    } else if (product.name === "Clamato") {
      await updateDoc(itemRef, {
        ...lastProduct,
        clamato: lastProduct.clamato + addAmount,
      });
    } else if (product.name === "Clasica") {
      await updateDoc(itemRef, {
        ...lastProduct,
        clasica: lastProduct.clasica + addAmount,
      });
    }

    setOpen(false);
    setLoad(false)
  };

  const isValid = () => {
    return addAmount > 0;
  };
  return (
    <>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <img src={product.img} alt="" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-base font-semibold leading-6 text-gray-900"
              id="modal-title"
            >
              Cantidad vendidas
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Agregue la cantidad de micheladas vendidas
              </p>
              <div className="mt-2 flex w-full items-center justify-around">
                <span className="text-7xl">{addAmount}</span>
                <button
                  onClick={() => setAddAmount(addAmount + 1)}
                  className="rounded-xl bg-[#38d79f] text-white"
                >
                  <UilPlus className="h-16 w-16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        {/* <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Deactivate
                  </button> */}
        <button
          onClick={() => updateItem()}
          disabled={!isValid()}
          type="button"
          className={`${
            !isValid() ? "bg-blue-300" : "bg-[#526dff]"
          } mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0 sm:w-auto`}
        >
          Aceptar
        </button>
      </div>
    </>
  );
};

export default ContentMiche;
