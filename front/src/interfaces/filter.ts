import { FilterField } from 'enums/filter'

export default interface Filter {
    name: string
    label: string
    fieldType: FilterField,
    options?: { label: string, value: string }[]
    colSpan: number
    mask?: string
}
