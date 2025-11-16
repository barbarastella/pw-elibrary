import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Home from './componentes/telas/Home.jsx'
import Sobre from "./componentes/telas/Sobre.jsx";
import Autores from "./componentes/telas/Autores.jsx";
import Generos from "./componentes/telas/Generos.jsx";
import Usuarios from "./componentes/telas/Usuarios.jsx";
import Reviews from "./componentes/telas/Reviews.jsx";
import Login from "./componentes/telas/Login.jsx";
import MenuPrivado from "./componentes/MenuPrivado.jsx";
import MenuPublico from "./componentes/MenuPublico.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MenuPublico />,
        children: [
            { index: true, element: <Home /> },
            { path: "sobre", element: <Sobre /> },
            { path: "reviews", element: <Reviews /> },
            { path: "login", element: <Login /> }
        ]
    },
    {
        path: "/admin",
        element: <MenuPrivado />,
        children: [
            { index: true, element: <Home /> },
            { path: "sobre", element: <Sobre /> },
            { path: "autores", element: <Autores /> },
            { path: "generos", element: <Generos /> },
            { path: "usuarios", element: <Usuarios /> },
            { path: "reviews", element: <Reviews /> },
        ]
    }
]);

function App() {
    return (<RouterProvider router={router} />);
};

export default App;