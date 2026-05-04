import { createContext, useContext } from 'react'

export interface FetchDataContext {
    data: any
    isLoading: boolean
}

export const FetchDataContext = createContext<FetchDataContext | undefined>(undefined)

export const useFetchDataContext = () => {
    const context = useContext(FetchDataContext) as FetchDataContext | undefined
    if (!context) {
        throw new Error('useFetchDataContext deve ser usado dentro de um <FetchDataProvider>')
    }
    return context
}