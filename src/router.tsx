import { createBrowserRouter } from 'react-router-dom';


import { Home } from './pages/home';
import { Detalhe } from './pages/detalhe';
import { NotFound } from './pages/notfound';

import { Layout } from './components/header/layout';



const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },

            {
                path: "/detalhe/:cripto",
                element: <Detalhe />
            },

            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])

export { router }