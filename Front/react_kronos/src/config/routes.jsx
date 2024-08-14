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
//import Login from "../pages/login/logins"
import Page from "../pages/landingPage/landingPage";
import Activation from "../pages/activation/activations";
import ActivationSent from "../pages/activationSent/activationSents";

import Materias from "../pages/materias/materias";
import Personal from "../pages/personal/personal";
import Perfil from "../pages/Perfil/Perfil";
import Horario from "../pages/horario/horario";
import EventsPage from "../pages/events/evento";


export const routes = [
    {
        path: "/",
        exact: true,
        private: true,
        layout: Navegacion,
        component: Home,

    },

    {
        path: "/prueba",
        exact: true,
        private: false,
        layout: Navegacion,
        component: Prueba
    },
    {
        path: "/perfil",
        exact: true,
        private: false,
        layout: Navegacion,
        component: Perfil
    },

    {
        path: "/login",
        exact: true,
        layout: Landig,
        component: Page
    },
    {
        path: "/activation",
        exact: true,
        layout: Landig,
        component: Activation
    },
    {
        path: "/activation-sent",
        exact: true,
        layout: Landig,
        component: ActivationSent
    },
    {
        path: "/materias",
        exact: true,
        private: false,
        layout: Navegacion,
        component: Materias
    },
    {
        path: "/personal",
        exact: true,
        private: false,
        layout: Navegacion,
        component: Personal
    },
    {
        path: "/horarios",
        exact: true,
        private: false,
        layout: Navegacion,
        component: Horario
    },
    {
        path: "/eventos",
        exact: true,
        private: false,
        layout: Navegacion,
        component: EventsPage,
    },
    {
        path: "/hometemplate",
        exact: true,
        private: false,
        layout: LayoutDefault,
        component: HomeTemplate,
    },
    {
        path: "/logintemplate",
        exact: true,
        private: false,
        layout: LayoutLogin,
        component: LoginTemplate,
    },
    {
        path: "/mailverificado",
        exact: true,
        private: false,
        layout: Landig,
        component: MailVerificado,
    }
];
