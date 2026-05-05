import {
    QueryClient,
    QueryClientProvider as Provider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchInterval: false,
            staleTime: Infinity
        }
    }
});

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider client={queryClient}>{children}</Provider>
}

export default QueryClientProvider