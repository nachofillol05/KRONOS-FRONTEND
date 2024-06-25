/*Layouts*/
import Navegacion from "../layout/navegacion/navegaciones";
import Landig from "../layout/landing/landings"

/*Pages*/
import Home from "../pages/home/Home";
import Prueba from "../pages/prueba/prueba";
import Login from "../pages/login/logins"
import Activation from "../pages/activation/activations";
import ActivationSent from "../pages/activationSent/activationSents";

import Materias from "../pages/materias/materias";
import Personal from "../pages/personal/personal";






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
        path: "/login",
        exact: true,
        layout: Landig,
        component: Login
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
    }
]