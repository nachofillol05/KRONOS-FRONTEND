import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Activation from "./pages/activation/Activation";
import ActivationSent from "./pages/activation_sent/ActivationSent";
import Login from "./pages/login/Login";
import Materias from "./pages/ver-materias/materias";
import Personal from "./pages/ver-Personal/personal"
import Prueba from "./pages/prueba/prueba"
import PrivateRoute from "./components/privateRoute/privateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/activation' element={<Activation />} />
        <Route path='/activation_sent' element={<ActivationSent />} />
        <Route path='/login' element={<Login />} />
        <Route path="/materias" element={<PrivateRoute><Materias/></PrivateRoute>}/>
        <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path="/personal" element={<PrivateRoute><Personal/></PrivateRoute>}/>
        <Route path='/prueba' element={<Prueba/>} />
      </Routes>
    </BrowserRouter>
  );
}

