import { createBrowserRouter } from 'react-router-dom'

import { backofficeRoutes } from './routes/backofficeRoutes';
import { storeRoutes } from './routes/storeRoutes';

export const router = createBrowserRouter([
    ...storeRoutes,
    ...backofficeRoutes
]);