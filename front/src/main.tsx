
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Provider as ChakraProvider } from './components/chakra-ui/provider.tsx'
import { router } from './routes.tsx'

console.log("?");

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	</StrictMode>,
)
