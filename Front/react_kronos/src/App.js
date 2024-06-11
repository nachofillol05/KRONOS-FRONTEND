import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Activation from "./pages/activation/Activation";
import ActivationSent from "./pages/activation_sent/ActivationSent";
import Login from "./pages/login/Login";
import Materias from "./pages/materias/materias";
import Personal from "./pages/personal/personal"
import Prueba from "./pages/prueba/prueba"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/activation' element={<Activation />} />
        <Route path='/activation_sent' element={<ActivationSent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/materias' element={<Materias />} />
        <Route path='/personal' element={<Personal />} />

        <Route path='/prueba' element={<Prueba/>} />
      </Routes>
    </BrowserRouter>
  );
}

