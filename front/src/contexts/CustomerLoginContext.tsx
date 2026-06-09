import { createContext, useContext } from 'react'

export interface CustomerLoginContextProps {
    isOpen: boolean
    setIsOpen: (args1: boolean) => void
    display: "login" | "register"
    setDisplay: (args1: "login" | "register") => void
}

export const CustomerLoginContext = createContext<CustomerLoginContextProps | undefined>(undefined)

export const useCustomerLoginContext = () => {
    const context = useContext(CustomerLoginContext) as CustomerLoginContextProps | undefined
    if (!context) {
        throw new Error('useCustomerLoginContext deve ser usado dentro de um <CustomerLoginProvider>')
    }
    return context
}