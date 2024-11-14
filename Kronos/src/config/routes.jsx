import Navegacion from "../layout/navegacion/navegaciones.jsx";
import Landig from "../layout/landing/landings.jsx";
import LayoutDefault from "../layouts/LayoutDefault.js";
import LayoutLogin from "../layouts/LayoutSignin.js";

/*Pages*/
import Home from "../pages/home/Home.js";
import Prueba from "../pages/prueba/prueba.jsx";
import HomeTemplate from "../pages/HomeTemplate/Home.js";
import aceptarDisponibilidad from "../pages/aceptarDisponibilidad/aceptarDisponibilidad.jsx"
import LoginTemplate from "../pages/LoginTemplate/Login.js"; 
import MailVerificado from "../pages/mailverificado/mailverificado.jsx"
import Login from "../pages/passwords/rememberPasswordEmail.jsx"
import MailEnviado from "../pages/mailenviado/mailenviado.jsx"
import ChangePassword  from "../pages/passwords/changePassword.jsx"
//import Login from "../pages/login/logins"
import Page from "../pages/landingPage/landingPage.jsx";

import Materias from "../pages/materias/materias.jsx";
import Personal from "../pages/personal/personal.jsx";
import Perfil from "../pages/Perfil/Perfil.jsx";
import Horario from "../pages/horario/horario.jsx";
import HorarioProfesor from "../pages/horario/horarioProfesor.jsx";
import EventsPage from "../pages/events/evento.jsx";
import { useEffect } from "react";

const redirigirHorario = () => {
    if (sessionStorage.getItem("rol") === "Profesor") {
        return {
            path: "/horarios",
            exact: true,
            private: true,
            layout: Navegacion,
            component: HorarioProfesor,
        }
    }else{
        return {
            path: "/horarios",
            exact: true,
            private: true,
            layout: Navegacion,
            component: Horario,
        }
}}
export const routes = [
    {
        path: "/prueba",
        exact: true,
        private: false,
        layout: LayoutLogin,
        component: Prueba
    },
    {
        path: "/perfil",
        exact: true,
        private: true,
        layout: Navegacion,
        component: Perfil
    },

    /*{
        path: "/loginAnterior",
        exact: true,
        layout: Landig,
        component: Page
    },*/
    {
        path: "/materias",
        exact: true,
        directive: true,
        layout: Navegacion,
        component: Materias
    },
    {
        path: "/personal",
        exact: true,
        directive: true,
        layout: Navegacion,
        component: Personal
    },
    redirigirHorario(),
    {
        path: "/eventos",
        exact: true,
        private: true,
        layout: Navegacion,
        component: EventsPage,
    },
    {
        path: "/aceptarDisponibilidad",
        exact: true,
        directive: true,
        layout: Navegacion,
        component: aceptarDisponibilidad,
    },
    {
        path: "/mailPassword",
        exact: true,
        private:false,
        layout: LayoutLogin,
        component: Login,
    },
    {
        path: "/",
        exact: true,
        private: false,
        layout: LayoutDefault,
        component: HomeTemplate,
    },
    {
        path: "/login",
        exact: true,
        private: false,
        layout: LayoutLogin,
        component: LoginTemplate,
    },
    {
        path: "/mailverificado/:token",
        exact: true,
        private: false,
        layout: Landig,
        component: MailVerificado,
    },
    {
        path: "/recuperarContrasenia/:token",
        exact: true,
        private: false,
        layout: LayoutLogin,
        component: ChangePassword,
    },
    {
        path: "/mailenviado",
        exact: true,
        private: false,
        layout: Landig,
        component: MailEnviado,
    }
];
