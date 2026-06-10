import { createContext, useContext } from 'react'

export interface FormContextProps {
    isLoading?: boolean
    isLoadingSubmit: boolean
}

export const FormContext = createContext<FormContextProps | undefined>(undefined)

export const useFormContext = () => {
    const context = useContext(FormContext) as FormContextProps | undefined
    if (!context) {
        throw new Error('useFormContext deve ser usado dentro de um <FormProvider>')
    }
    return context
}