import { createListCollection, Portal, Select } from "@chakra-ui/react"
import InputContainer from "./InputContainer"
import { Controller, useFormContext } from "react-hook-form"

interface Props {
    id: string
    label: string
    options: Option[]
}

interface Option {
    value: number
    label: string
}

const SelectInput = (props: Props) => {
    const { setValue, control } = useFormContext();
    const { options } = props;

    const collections = createListCollection({
        items: options
    })

    const onChange = (value: string[]) => setValue(props.id, value[0])

    return (
        <InputContainer {...props}>
            <Controller
                control={control}
                name={props.id}
                render={({ field }) => (
                    <Select.Root name={field.name} value={[field.value]} collection={collections} onValueChange={({ value }) => onChange(value)} size="sm" width="320px"  >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder={`Select ${props.label}`} />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {collections.items.map((collection) => (
                                        <Select.Item item={collection} key={collection.value}>
                                            {collection.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>

                )} />
        </InputContainer>
    )
}

export default SelectInput