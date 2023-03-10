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

const App = () => {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = () => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      if(currentUser.displayName === "Miches"){
        return <Home/>;
      }else{
        return <HomeC/>;
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

          <Route path="/gastos-carnes" element={<BillsC />} />
          <Route path="/carnes" element={<Carnes />} />
          <Route path="/caja-carnes" element={<SaledC />} />
        </Routes>
      </BrowserRouter>
    </MicheladaProvider>
  );
};

export default App;
