/*Layouts*/
import Navegacion from "../layout/navegacion/navegaciones";
import Landig from "../layout/landing/landings"

/*Pages*/
import Home from "../pages/home/Home";
import Prueba from "../pages/prueba/prueba";
//import Login from "../pages/login/logins"
import Page from "../pages/landingPage/landingPage";
import Activation from "../pages/activation/activations";
import ActivationSent from "../pages/activationSent/activationSents";

import Materias from "../pages/materias/materias";
import Personal from "../pages/personal/personal";
import Perfil from "../pages/Perfil/Perfil";






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
        private: true,
        layout: Navegacion,
        component: Materias
    },
    {
        path: "/personal",
        exact: true,
        private: true,
        layout: Navegacion,
        component: Personal
    },

]