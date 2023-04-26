import React, { useState } from "react";
import { UilArrowLeft } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

const Pendientes = () => {
  const navigate = useNavigate();
  const [check, setCheck] = useState(false)
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
          Pendientes
        </h2>
      </span>

      <div className="rounded-xl bg-white p-10 mx-5">
        <div>Nombre</div>
        <div>Lugar de entrega</div>
        <div>Pedido</div>
        <label className="relative inline-flex cursor-pointer items-center">
          <input type="checkbox" value={check} className="peer sr-only"/>
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Checked toggle
          </span>
        </label>
      </div>
    </div>
  );
};

export default Pendientes;
