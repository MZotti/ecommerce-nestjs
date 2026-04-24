import { createListCollection, Portal, Select } from "@chakra-ui/react"
import InputContainer from "./InputContainer"
import { useFormContext } from "react-hook-form"

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
    const { getValues, setValue } = useFormContext();
    const { options } = props;

    const value = getValues(props.id)

    const collections = createListCollection({
        items: options
    })

    const onChange = (value: string[]) => {
        const selectedValue = Number(value[0]);
        setValue(props.id, selectedValue);
    }

    return (
        <InputContainer {...props}>
            <Select.Root collection={collections} size="sm" width="320px" value={[value]} onValueChange={(e) => onChange(e.value)}>
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
        </InputContainer>
    )
}

export default SelectInput