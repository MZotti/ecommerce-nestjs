import { Slider } from "@chakra-ui/react"
import InputContainer from "./InputContainer"
import { Controller, useFormContext as useHookFormContext } from "react-hook-form"
import { useFormContext } from "@/contexts/FormContext"

interface Props {
    id: string
    label: string
    required?: boolean
    colSpan?: number
}

const SliderInput = (props: Props) => {
    const { isLoadingSubmit } = useFormContext();
    const { setValue, control } = useHookFormContext();

    const onChange = (value: number[]) => {
        setValue(`${props.id}From`, value[0])
        setValue(`${props.id}To`, value[1])
    }

    return (
        <InputContainer {...props}>
            <Controller
                name={props.id}
                control={control}
                render={({ field }) => (
                    <Slider.Root
                        name={field.name}
                        value={field.value}
                        disabled={isLoadingSubmit}
                        onValueChange={({ value }) => {
                            onChange(value)
                        }}
                        onFocusChange={({ focusedIndex }) => {
                            console.log(focusedIndex)
                            if (focusedIndex !== -1) return
                            field.onBlur()
                        }}
                        defaultValue={[0, 10000]}
                        minStepsBetweenThumbs={8}
                        max={10000}
                        width="full"
                    >
                        <Slider.Control>
                            <Slider.Track>
                                <Slider.Range />
                            </Slider.Track>
                            <Slider.Thumbs />
                        </Slider.Control>
                        <Slider.ValueText>
                        </Slider.ValueText>
                    </Slider.Root>
                )}
            />
        </InputContainer>
    )
}

export default SliderInput