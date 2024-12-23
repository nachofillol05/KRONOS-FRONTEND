import Navegacion from "../layout/navegacion/navegaciones.jsx";
import Landig from "../layout/landing/landings.jsx";
import LayoutLogin from "../layout/LayoutSignin.js";

/*Pages*/
import HomeTemplate from "../pages/HomeTemplate/Home.jsx";
import aceptarDisponibilidad from "../pages/aceptarDisponibilidad/aceptarDisponibilidad.jsx"
import LoginTemplate from "../pages/LoginTemplate/Login.js"; 
import MailVerificado from "../pages/mailverificado/mailverificado.jsx"
import Login from "../pages/passwords/rememberPasswordEmail.jsx"
import MailEnviado from "../pages/mailenviado/mailenviado.jsx"
import ChangePassword  from "../pages/passwords/changePassword.jsx"

import Materias from "../pages/materias/materias.jsx";
import Personal from "../pages/personal/personal.jsx";
import Perfil from "../pages/Perfil/Perfil.jsx";
import Horario from "../pages/horario/horario.jsx";
import HorarioProfesor from "../pages/horario/horarioProfesor.jsx";
import EventsPage from "../pages/events/evento.jsx";

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
        path: "/perfil",
        exact: true,
        private: true,
        layout: Navegacion,
        component: Perfil
    },

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
        layout: Landig,
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
