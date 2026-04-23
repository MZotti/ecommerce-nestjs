import { GridItem, Input, InputGroup, Text, VStack } from '@chakra-ui/react'
import {
    useFormContext,
} from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'

import type Filter from 'interfaces/filter'
import { FilterField } from 'enums/filter'
import { CalendarDotsIcon } from '@phosphor-icons/react'

interface Props {
    field: Filter
}

// const getField = (
//     fieldType: FilterField,
//     name: string,
//     register: UseFormRegister<FieldValues>,
//     registerMask: (args1: string, args2: string[]) => UseFormRegisterReturn,
// ): React.ReactNode => {
//     switch (fieldType) {
//         case FilterField.TEXT:
//             return <Input {...register(name)} />
//         case FilterField.DATE:
//             return (
//                 <InputGroup startElement={<CalendarDotsIcon />}>
//                     <Input defaultValue="" {...registerMask(name, ['99/99/9999'])} />
//                 </InputGroup>
//             )
//         default:
//             return <Input {...register(name)} />
//     }
// }

const FilterInput = ({ field }: Props) => {
    const { register } = useFormContext()
    const registerWithMask = useHookFormMask(register)

    return (
        <></>
        // <GridItem colSpan={field.colSpan}>
        //     <VStack alignItems="start">
        //         <Text fontSize="md">{field.label}</Text>
        //         {getField(field.fieldType, field.name, register, registerWithMask)}
        //     </VStack>
        // </GridItem>
    )
}

export default FilterInput
