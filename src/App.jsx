import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Sobre from "./componentes/telas/Sobre";
import Autores from "./componentes/telas/Autores";
import Generos from "./componentes/telas/Generos";
import Usuarios from "./componentes/telas/Usuarios";
import Reviews from "./componentes/telas/Reviews";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Menu />,
        children: [
            { index: true, element: <Home /> },
            { path: "/sobre", element: <Sobre /> },
            { path: "/autores", element: <Autores /> },
            { path: "/generos", element: <Generos /> },
            { path: "/usuarios", element: <Usuarios /> },
            { path: "/reviews", element: <Reviews /> }
        ]
    },
]);

function App() {
    return (<RouterProvider router={router} />);
};

export default App;