import { Combobox, HStack, Portal, Span, Spinner, useListCollection } from "@chakra-ui/react"
import InputContainer from "./InputContainer"
import { Controller, useFormContext } from "react-hook-form"
import { useState } from "react"
import { useAsync } from "react-use"
import type Product from "@/interfaces/product"

interface Props {
    id: string
    label: string
    required?: boolean
    colSpan?: number
    onSearch: any
    optionLabel: string
    optionSecondaryLabel?: string
}

const AsyncSelectSearchInput = (props: Props) => {
    const { onSearch, optionLabel, optionSecondaryLabel } = props;

    const { setValue, control } = useFormContext();
    const [inputValue, setInputValue] = useState("")

    const { collection, set } = useListCollection<any>({
        initialItems: [],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.name,
    })

    const state = useAsync(async () => {
        if (inputValue.length < 3)
            return;

        const data = await onSearch(inputValue);
        set(data)
    }, [inputValue, set])

    const onChange = (value: Product[]) => {
        const valueSelected = value[0]
        setValue(props.id, valueSelected.id)
    }

    return (
        <InputContainer {...props}>
            <Controller
                control={control}
                name={props.id}
                render={({ field }) => (
                    <Combobox.Root
                        name={field.name}
                        width="320px"
                        collection={collection}
                        placeholder="Search"
                        onInputValueChange={(e) => setInputValue(e.inputValue)}
                        onValueChange={({ items }) => onChange(items)}
                        positioning={{ sameWidth: false, placement: "bottom-start" }}
                    >
                        <Combobox.Control>
                            <Combobox.Input placeholder="Type to search" />
                            <Combobox.IndicatorGroup>
                                <Combobox.ClearTrigger />
                                <Combobox.Trigger />
                            </Combobox.IndicatorGroup>
                        </Combobox.Control>
                        <Portal>
                            <Combobox.Positioner>
                                <Combobox.Content minW="sm">
                                    {state.loading ? (
                                        <HStack p="2">
                                            <Spinner size="xs" borderWidth="1px" />
                                            <Span>Loading...</Span>
                                        </HStack>
                                    ) : state.error ? (
                                        <Span p="2" color="fg.error">
                                            Error fetching
                                        </Span>
                                    ) : (
                                        collection.items?.map((item) => (
                                            <Combobox.Item key={item.id} item={item}>
                                                <HStack justify="space-between" textStyle="sm">
                                                    <Span fontWeight="medium" truncate>
                                                        {item[optionLabel]}
                                                    </Span>
                                                    {
                                                        optionSecondaryLabel &&
                                                        <Span color="fg.muted" truncate>
                                                            {item[optionSecondaryLabel]}
                                                        </Span>
                                                    }
                                                </HStack>
                                                <Combobox.ItemIndicator />
                                            </Combobox.Item>
                                        ))
                                    )}
                                </Combobox.Content>
                            </Combobox.Positioner>
                        </Portal>
                    </Combobox.Root>
                )} />
        </InputContainer>
    )
}

export default AsyncSelectSearchInput