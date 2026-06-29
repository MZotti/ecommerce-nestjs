import StoreLayout from "@/layouts/store/StoreLayout";

import StoreHome from '@/pages/store/Home';
import Account from "@/pages/store/Account";
import Product from "@/pages/store/Product";
import Cart from "@/pages/store/Cart";
import Checkout from "@/pages/store/Checkout";
import Details from "@/pages/store/Account/Details";
import Orders from "@/pages/store/Account/Orders";
import ViewOrder from "@/pages/store/Account/ViewOrder";
import Addressses from "@/pages/store/Account/Addresses";
import Products from "@/pages/store/Products";
import PaymentCards from "@/pages/store/Account/PaymentCards";

export const storeRoutes = [
    {
        path: '/',
        element: <StoreLayout />,
        children: [
            { index: true, element: <StoreHome /> },
            {
                path: 'my-account', element: <Account />, children: [
                    { index: true, element: <Details /> },
                    { path: 'details', element: <Details /> },
                    { path: 'orders', element: <Orders /> },
                    { path: 'orders/:orderId', element: <ViewOrder /> },
                    { path: 'addresses', element: <Addressses /> },
                    { path: 'cards', element: <PaymentCards /> },
                ]
            },
            { path: ':slug', element: <Products /> },
            { path: 'product/:slug', element: <Product /> },
            { path: 'cart', element: <Cart /> },
            { path: 'checkout', element: <Checkout /> },
        ],
    },
]