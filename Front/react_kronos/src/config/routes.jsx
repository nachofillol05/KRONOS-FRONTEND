/*Layouts*/
import Navegacion from "../layout/navegacion/navegaciones";
import Landig from "../layout/landing/landings"

/*Pages*/
import Home from "../pages/home/Home";
import Prueba from "../pages/prueba/prueba";
import Login from "../pages/login/logins"
/*Components*/
import Drawer from "../components/drawer/drawers";




export const routes = [
    {
        path: "/",
        exact: true,
        layout: Navegacion,
        component: Home,

    },
    
    {
        path: "/prueba",
        exact: true,
        private: true,
        layout: Navegacion,
        component: Prueba
    },

    {
        path: "/login",
        exact: true,
        layout: Landig,
        component: Login
    }
]