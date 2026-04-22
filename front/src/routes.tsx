import { createBrowserRouter } from 'react-router-dom'

import EcommerceLayout from 'layouts/ecommerce/EcommerceLayout';
import BackofficeLayout from 'layouts/backoffice/BackofficeLayout';

import StoreHome from './pages/store/Home';

import Login from './pages/backoffice/Login';
import BackofficeHome from './pages/backoffice/Home';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <EcommerceLayout />,
        children: [
            { index: true, element: <StoreHome /> },
        ],
    },
    {
        path: '/backoffice/login',
        element: <Login />
    },
    {
        path: '/backoffice',
        element: <BackofficeLayout />,
        children: [
            { index: true, element: <BackofficeHome /> },
        ],
    },
]);