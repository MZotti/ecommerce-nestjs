
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Provider as ChakraProvider } from './components/chakra-ui/provider.tsx'
import { router } from './routes.tsx'

import './assets/styles/app.css';
import QueryClientProvider from './providers/QueryClientProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider>
			<ChakraProvider>
				<RouterProvider router={router} />
			</ChakraProvider>
		</QueryClientProvider>
	</StrictMode>,
)
