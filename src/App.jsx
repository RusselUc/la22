import { BrowserRouter, Route, Routes } from "react-router-dom";
import MicheladaProvider from "./context/MicheladaProvider";
import Bills from "./pages/Bills";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Miches from "./pages/Miches";
import Saled from "./pages/Saled";

const App = () => {
  return (
    <MicheladaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/micheladas" element={<Miches />} />
          <Route path="/caja" element={<Saled />} />
          <Route path="/gastos" element={<Bills />} />
        </Routes>
      </BrowserRouter>
    </MicheladaProvider>
  );
};

export default App;
