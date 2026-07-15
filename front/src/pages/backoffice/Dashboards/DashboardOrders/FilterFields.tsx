import DatePickerInput from "@/components/Inputs/DatePickerInput";

const FilterFields: React.ReactNode[] = [
    <DatePickerInput
        key='createdAtStart'
        id='createdAtStart'
        label='Created At Start'
        colSpan={2}
    />,
    <DatePickerInput
        key='createdAtEnd'
        id='createdAtEnd'
        label='Created At End'
        colSpan={2}
    />,

]

export default FilterFields