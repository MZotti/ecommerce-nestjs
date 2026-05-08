import EcommerceLayout from "@/layouts/ecommerce/EcommerceLayout";

import StoreHome from '@/pages/store/Home';

export const storeRoutes = [
    {
        path: '/',
        element: <EcommerceLayout />,
        children: [
            { index: true, element: <StoreHome /> },
        ],
    },
]