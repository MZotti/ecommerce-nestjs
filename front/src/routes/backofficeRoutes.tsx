
import BackofficeLayout from 'layouts/backoffice/BackofficeLayout';

import BackofficeHome from '@/pages/backoffice/Home';
import Login from '@/pages/backoffice/Login';

import Account from '@/pages/backoffice/Account';
import Settings from '@/pages/backoffice/Settings';

import DashboardOrders from '@/pages/backoffice/Dashboards/DashboardOrders';
import DashboardProducts from '@/pages/backoffice/Dashboards/DashboardProducts';

import Orders from '@/pages/backoffice/Orders';
import CreateOrder from '@/pages/backoffice/Orders/CreateOrder';
import ViewOrder from '@/pages/backoffice/Orders/ViewOrder';

import Products from '@/pages/backoffice/Products';
import CreateProduct from '@/pages/backoffice/Products/CreateProduct';
import UpdateProduct from '@/pages/backoffice/Products/UpdateProduct';
import ViewProduct from '@/pages/backoffice/Products/ViewProduct';

import Users from '@/pages/backoffice/Users';
import CreateUser from '@/pages/backoffice/Users/CreateUser';
import UpdateUser from '@/pages/backoffice/Users/UpdateUser';
import ViewUser from '@/pages/backoffice/Users/ViewUser';

import Customers from '@/pages/backoffice/Customers';
import ViewCustomer from '@/pages/backoffice/Customers/ViewCustomer';
import RoleGuard from './RoleGuard';

export const backofficeRoutes = [
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

            { path: 'customers', element: <Customers /> },
            { path: 'customers/:id', element: <ViewCustomer /> },

            { path: 'users', element: <Users />, },
            { path: 'users/create', element: <CreateUser /> },
            { path: 'users/:id', element: <ViewUser /> },
            { path: 'users/:id/update', element: <UpdateUser /> },

            { path: '*', element: <BackofficeHome /> },
        ],
    },
]