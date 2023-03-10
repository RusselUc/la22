import React, { useContext } from "react";
import { UilArrowLeft } from '@iconscout/react-unicons'
import { useNavigate } from "react-router-dom";
import { MicheladaContext } from "../context/MicheladaProvider";
import DataTable from 'react-data-table-component';

const Saled = () => {
    const navigate = useNavigate()
    const { lastProduct, saled, closeDay } = useContext(MicheladaContext)

    const columns = [
        {
            name: 'Michelada',
            selector: row => row.michelada,
        },
        {
            name: 'Cantidad',
            selector: row => row.cantidad,
        },
    ];

    const data = [
        {
            id: 1,
            michelada:'Fresa',
            cantidad:lastProduct.fresa,
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
            michelada: "Total",
            cantidad: ((saled() - lastProduct.clasica) * 40) + (lastProduct.clasica * 45),
        },
    ]
    const Data = () => {
        for (let clave in lastProduct){
            if(clave !== 'dayOpen' && clave !== 'date') {
                // sal = sal +lastProduct[clave]
                console.log(clave + " " + lastProduct[clave])
                // return (<p key={clave}>{clave} : {lastProduct[clave]}</p>)
            }
          }
    }
  return (
    <div className="flex h-screen flex-col gap-10 bg-[#f6f7ff]">
      <span className="flex items-center bg-[#526dff]">
        <div className="w-1/3 px-5 cursor-pointer" onClick={() => navigate("/")}>
            <UilArrowLeft className="h-10 w-10 text-white"/>
        </div>
        <h2 className="my-5 text-4xl font-light text-white text-center w-1/2">Caja</h2>
      </span>
      <DataTable className="p-5" columns={columns} data={data}/>
      <button onClick={() => closeDay()} className="bg-[#ff5f93] mx-10 py-2 rounded-xl text-white">Cerrar día</button>
      {/* <div className="flex flex-col text-2xl gap-5">
        <label>Fresa: {lastProduct.fresa}</label>
        <label>Mango: {lastProduct.mango}</label>
        <label>Piña: {lastProduct.pina}</label>
        <label>Tamarindo: {lastProduct.tamarindo}</label>
        <label>Clamato: {lastProduct.clamato}</label>
        <label>Clasica: {lastProduct.clasica}</label>
      </div> */}
    </div>
  );
};

export default Saled;
