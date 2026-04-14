import { createBrowserRouter } from 'react-router-dom'

import EcommerceLayout from 'layouts/ecommerce/EcommerceLayout';
import BackofficeLayout from 'layouts/backoffice/BackofficeLayout';

import Home from "pages/ecommerce/Home"
import Login from "pages/backoffice/Login"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <EcommerceLayout />,
        children: [
            { index: true, element: <Home /> },
        ],
    },
    {
        path: '/backoffice',
        element: <BackofficeLayout />,
        children: [
            { index: true, element: <Login /> },
        ],
    },
]);