import DatePickerInput from "@/components/Inputs/DatePickerInput";
import SelectInput from "@/components/Inputs/SelectInput";

const FilterFields: React.ReactNode[] = [
    <SelectInput
        key='category'
        id='category'
        label='Category'
        options={
            [
                {
                    label: 'Graphic Card',
                    value: 'graphic-card'
                },
                {
                    label: 'CPU',
                    value: 'cpus'
                },
                {
                    label: 'Mother Board',
                    value: 'mother-board'
                },
                {
                    label: 'RAM',
                    value: 'ram'
                },
                {
                    label: 'Storage',
                    value: 'storage'
                },
                {
                    label: 'Power Supply',
                    value: 'power-supply'
                },
                {
                    label: 'CPU Cooler',
                    value: 'cpi-cooler'
                },
                {
                    label: 'Case',
                    value: 'case'
                },
                {
                    label: 'Case Fan',
                    value: 'case-fan'
                },
            ]}
        colSpan={4}
    />,
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