import { createBrowserRouter } from 'react-router-dom'

import EcommerceLayout from 'layouts/ecommerce/EcommerceLayout';
import BackofficeLayout from 'layouts/backoffice/BackofficeLayout';

import StoreHome from './pages/store/Home';

import Login from './pages/backoffice/Login';
import BackofficeHome from './pages/backoffice/Home';
import Account from './pages/backoffice/Account';
import Settings from './pages/backoffice/Settings';

import Products from './pages/backoffice/Products';
import CreateProduct from './pages/backoffice/Products/CreateProduct';
import ViewProduct from './pages/backoffice/Products/ViewProduct';
import UpdateProduct from './pages/backoffice/Products/UpdateProduct';

import Orders from './pages/backoffice/Products copy';
import ViewOrder from './pages/backoffice/Products copy/ViewOrder';

import Users from './pages/backoffice/Users';
import ViewUser from './pages/backoffice/Users/ViewUser';
import CreateUser from './pages/backoffice/Users/CreateUser';
import UpdateUser from './pages/backoffice/Users/UpdateUser';
import CreateOrder from './pages/backoffice/Products copy/CreateOrder';
import DashboardProducts from './pages/backoffice/Dashboards/DashboardProducts';
import DashboardOrders from './pages/backoffice/Dashboards/DashboardOrders';

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
            
            { path: 'dashboards/products', element: <DashboardProducts /> },
            { path: 'dashboards/orders', element: <DashboardOrders /> },

            { path: 'products', element: <Products /> },
            { path: 'products/create', element: <CreateProduct /> },
            { path: 'products/:id', element: <ViewProduct /> },
            { path: 'products/:id/update', element: <UpdateProduct /> },

            { path: 'orders', element: <Orders /> },
            { path: 'orders/create', element: <CreateOrder /> },
            { path: 'orders/:id', element: <ViewOrder /> },

            { path: 'users', element: <Users /> },
            { path: 'users/create', element: <CreateUser /> },
            { path: 'users/:id', element: <ViewUser /> },
            { path: 'users/:id/update', element: <UpdateUser /> },

            { path: '*', element: <BackofficeHome /> },
        ],
    },
]);