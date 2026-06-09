
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Provider as ReduxProvider } from 'react-redux'
import { Provider as ChakraProvider } from './components/chakra-ui/provider.tsx'
import { router } from './routes.tsx'

import './assets/styles/app.css';
import QueryClientProvider from './providers/QueryClientProvider.tsx'
import { store } from 'state/store'

createRoot(document.getElementById('root')!).render(
	// <StrictMode>
		<QueryClientProvider>
			<ReduxProvider store={store}>
				<ChakraProvider>
					<RouterProvider router={router} />
				</ChakraProvider>
			</ReduxProvider>
		</QueryClientProvider>
	// </StrictMode>,
)
