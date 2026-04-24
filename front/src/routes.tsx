import { createBrowserRouter } from 'react-router-dom'

import EcommerceLayout from 'layouts/ecommerce/EcommerceLayout';
import BackofficeLayout from 'layouts/backoffice/BackofficeLayout';

import StoreHome from './pages/store/Home';

import Login from './pages/backoffice/Login';
import BackofficeHome from './pages/backoffice/Home';
import Account from './pages/backoffice/Account';
import Settings from './pages/backoffice/Settings';

import Users from './pages/backoffice/Users';
import CreateUser from './pages/backoffice/Users/CreateUser';
import UpdateUser from './pages/backoffice/Users/UpdateUser';

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
            { path: 'account', element: <Account /> },
            { path: 'settings', element: <Settings /> },
            { path: 'users', element: <Users /> },
            { path: 'users/create', element: <CreateUser /> },
            { path: 'users/:id', element: <CreateUser /> },
            { path: 'users/:id/update', element: <UpdateUser /> },
            { path: '*', element: <BackofficeHome /> },
        ],
    },
]);