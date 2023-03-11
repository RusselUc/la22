import React, { useContext } from "react";
import { UilArrowLeft } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import { MicheladaContext } from "../context/MicheladaProvider";
import DataTable from 'react-data-table-component';

const SaledC = () => {
    const navigate = useNavigate()
    const { lastMeat, saled, closeDayMeat, allAmountMeat } = useContext(MicheladaContext)

    const columns = [
        {
            name: 'Michelada',
            selector: row => row.carne,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad,
        },
    ];

    const data = [
        {
            id: 1,
            carne:'Platillo',
            cantidad:lastMeat.platillo,
        },
        {
            id: 2,
            carne: "Media",
            cantidad: lastMeat.media,
        },
        {
            id: 3,
            carne: "Kilo",
            cantidad: lastMeat.kilo,
        },
        {
            id: 4,
            carne: "Libre",
            cantidad: lastMeat.libre,
        },
        {
            id: 5,
            carne: "Total",
            cantidad: (lastMeat.media * 70) + (lastMeat.platillo * 140) + (lastMeat.kilo * 280) + (lastMeat.libre),
        },
        {
            id: 6,
            carne: "Total - gastos",
            cantidad: ((lastMeat.platillo * 70) + (lastMeat.media * 140) + (lastMeat.kilo * 280) + (lastMeat.libre)) - allAmountMeat,
        },
    ]
  return (
    <div className="flex h-screen flex-col gap-10 bg-[#f6f7ff]">
      <span className="flex items-center bg-[#526dff]">
        <div className="w-1/3 px-5 cursor-pointer" onClick={() => navigate("/")}>
            <UilArrowLeft className="h-10 w-10 text-white"/>
        </div>
        <h2 className="my-5 text-4xl font-light text-white text-center w-1/2">Caja</h2>
      </span>
      <DataTable className="p-5" columns={columns} data={data}/>
      <button onClick={() => closeDayMeat()} className="bg-[#ff5f93] mx-10 py-2 rounded-xl text-white">Cerrar día</button>
    </div>
  );
};

export default SaledC;
