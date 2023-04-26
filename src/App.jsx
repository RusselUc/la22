import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import MicheladaProvider from "./context/MicheladaProvider";
import Bills from "./pages/Bills";
import BillsC from "./pages/BillsC";
import Carnes from "./pages/Carnes";
import Home from "./pages/Home";
import HomeC from "./pages/HomeC";
import Login from "./pages/Login";
import Miches from "./pages/Miches";
import Register from "./pages/Register";
import Saled from "./pages/Saled";
import SaledC from "./pages/SaledC";
import Pendientes from "./pages/Pendientes";

const App = () => {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = () => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      if(currentUser.displayName === "Miches"){
        return <Home/>;
      }else if(currentUser.displayName === "Carnes"){
        return <HomeC/>;
      } else {
        return <Login/>
      }
    }
  };
  return (
    <MicheladaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/micheladas" element={<Miches />} />
          <Route path="/caja" element={<Saled />} />
          <Route path="/gastos" element={<Bills />} />
          <Route path="/pendientes" element={<Pendientes />} />

          <Route path="/gastos-carnes" element={<BillsC />} />
          <Route path="/carnes" element={<Carnes />} />
          <Route path="/caja-carnes" element={<SaledC />} />

          <Route path="/register" element={<Register />} />
          <Route path="/cliente" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </MicheladaProvider>
  );
};

export default App;
