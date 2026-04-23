import { FilterField } from 'enums/filter'

export default interface Filter {
    name: string
    label: string
    fieldType: FilterField
    colSpan: number
    mask?: string
}
