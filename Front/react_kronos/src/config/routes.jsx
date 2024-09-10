import Navegacion from "../layout/navegacion/navegaciones";
import Landig from "../layout/landing/landings";
import LayoutDefault from "../layouts/LayoutDefault.js";
import LayoutLogin from "../layouts/LayoutSignin";

/*Pages*/
import Home from "../pages/home/Home";
import Prueba from "../pages/prueba/prueba";
import HomeTemplate from "../pages/HomeTemplate/Home.js";
import LoginTemplate from "../pages/LoginTemplate/Login.js"; 
import MailVerificado from "../pages/mailverificado/mailverificado.jsx"
import MailEnviado from "../pages/mailenviado/mailenviado.jsx"
//import Login from "../pages/login/logins"
import Page from "../pages/landingPage/landingPage";

import Materias from "../pages/materias/materias";
import Personal from "../pages/personal/personal";
import Perfil from "../pages/Perfil/Perfil";
import Horario from "../pages/horario/horario";
import HorarioProfesor from "../pages/horario/horarioProfesor";
import EventsPage from "../pages/events/evento";
import { useEffect } from "react";

const redirigirHorario = () => {
    if (sessionStorage.getItem("rol") === "Profesor") {
        console.log("Profesor");
        return {
            path: "/horarios",
            exact: true,
            private: true,
            layout: Navegacion,
            component: HorarioProfesor,
        }
    }else{
        console.log("No Profesor");
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
        path: "/",
        exact: true,
        private: true,
        layout: Landig,
        component: Home,

    },

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
        path: "/landing",
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
        path: "/mailenviado",
        exact: true,
        private: false,
        layout: Landig,
        component: MailEnviado,
    }
];
