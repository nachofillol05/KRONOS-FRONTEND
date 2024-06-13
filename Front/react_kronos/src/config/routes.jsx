/*Layouts*/
import Navegacion from "../layout/navegacion/navegaciones";


/*Pages*/
import Home from "../pages/home/Home";
import Prueba from "../pages/prueba/prueba";

/*Components*/
import Drawer from "../components/drawer/drawers";


export const routes = [
    {
        path: "/",
        exact: true,
        layout: Drawer,
        component: Home
    },
    
    {
        path: "/prueba",
        exact: true,
        layout: Navegacion,
        component: Prueba
    }
]