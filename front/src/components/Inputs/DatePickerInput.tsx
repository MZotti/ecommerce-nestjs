import { DatePicker, Input, parseDate, Portal } from '@chakra-ui/react'
import InputContainer from './InputContainer'
import { useFormContext } from "@/contexts/FormContext"
import { Controller, useFormContext as useHookFormContext } from 'react-hook-form'
import { CalendarIcon } from '@phosphor-icons/react'

interface Props {
    id: string
    label: string
    required?: boolean
    colSpan?: number
}

const DatePickerInput = (props: Props) => {
    const { id } = props
    const { isLoadingSubmit } = useFormContext();
    const { setValue, control } = useHookFormContext();

    const onChange = (value: any) => {
        const parsedValue = value.map((d: any) => d.toString()).join(", ")
        setValue(id, parsedValue.toString())
    }

    return (
        <InputContainer {...props}>
            <Controller
                control={control}
                name={props.id}
                render={({ field }) => (
                    <DatePicker.Root disabled={isLoadingSubmit} size="sm" value={field.value ? [parseDate(field.value)] : []} onValueChange={(e) => onChange(e.value)}>
                        <DatePicker.Control>
                            <DatePicker.Input />
                            <DatePicker.IndicatorGroup>
                                <DatePicker.Trigger cursor="pointer">
                                    <CalendarIcon />
                                </DatePicker.Trigger>
                            </DatePicker.IndicatorGroup>
                        </DatePicker.Control>
                        <Portal>
                            <DatePicker.Positioner>
                                <DatePicker.Content>
                                    <DatePicker.View view="day">
                                        <DatePicker.Header />
                                        <DatePicker.DayTable />
                                    </DatePicker.View>
                                    <DatePicker.View view="month">
                                        <DatePicker.Header />
                                        <DatePicker.MonthTable />
                                    </DatePicker.View>
                                    <DatePicker.View view="year">
                                        <DatePicker.Header />
                                        <DatePicker.YearTable />
                                    </DatePicker.View>
                                </DatePicker.Content>
                            </DatePicker.Positioner>
                        </Portal>
                    </DatePicker.Root>
                )} />
        </InputContainer>
    )
}

export default DatePickerInput