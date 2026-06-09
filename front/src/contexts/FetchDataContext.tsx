import { createContext, useContext } from 'react'

export interface FetchDataContext<T = unknown> {
    data: T
    isLoading: boolean
}

export const FetchDataContext = createContext<FetchDataContext<unknown> | undefined>(undefined)

export const useFetchDataContext = <T,>() => {
    const context = useContext(FetchDataContext) as FetchDataContext<T> | undefined
    if (!context) {
        throw new Error('useFetchDataContext deve ser usado dentro de um <FetchDataProvider>')
    }
    return context
}