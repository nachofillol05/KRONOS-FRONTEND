import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Activation from "./pages/activation/Activation";
import ActivationSent from "./pages/activation_sent/ActivationSent";
import Login from "./pages/login/Login";
import Materias from "./pages/ver-materias/materias";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/activation' element={<Activation />} />
        <Route path='/activation_sent' element={<ActivationSent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/materias' element={<Materias />} />
      </Routes>
    </BrowserRouter>
  );
}

