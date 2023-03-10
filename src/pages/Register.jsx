import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import logo from "../assets/img/logo.png";
import { auth, db } from "../firebase";

const Register = () => {
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [rol, setRol] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, user, pass);
      await updateProfile(res.user, {
        displayName:rol
      });

      console.log(res)
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const isValid = () => {
    return user.length > 0 && pass.length > 0;
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#f6f7ff]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-10 rounded-xl bg-white py-10 px-5">
        <img className="h-40 w-40 object-cover" src={logo} alt="" />
        <input
          className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
          type="text"
          placeholder="Rol (Carnes / Miches)"
          onChange={(e) => setRol(e.target.value)}
        />
        <input
          className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
          type="text"
          placeholder="Usuario"
          onChange={(e) => setUser(e.target.value+'@la22.com')}
        />
        <input
          className="rounded-lg border bg-[#f6f7ff] p-3 text-lg outline-none"
          type="text"
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
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
  );
};

export default Register;
