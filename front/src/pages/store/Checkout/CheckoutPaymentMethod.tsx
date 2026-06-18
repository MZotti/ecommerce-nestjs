import { createListCollection, HStack, RadioCard, Text, VStack } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import CheckoutPaymentCard from "./CheckoutPaymentCard";

const CheckoutPaymentMethod = () => {
    const { setValue, watch, formState: { errors }, clearErrors } = useFormContext();

    const paymentMethod = watch("paymentMethod")

    const hasError = errors?.paymentMethod;
    const errorMessage = errors?.paymentMethod?.message?.toString() || ""

    const collection = createListCollection({
        items: [
            { value: "PIX", label: "PIX" },
            { value: "PAYMENT_ORDER", label: "PAYMENT ORDER" },
            { value: "CREDIT", label: "CREDIT" },
            { value: "DEBIT", label: "DEBIT" }
        ]
    })

    const onChange = (option: string | null) => {
        setValue("paymentMethod", option);
        clearErrors("paymentMethod");
    }

    return (
        <VStack p={4} borderRadius={4} outline="1px solid" outlineColor={hasError ? "red.400" : "transparent"} backgroundColor={hasError ? "red.200" : "inherit"} alignItems="start" w="full" transition="0.2s all ease">
            <RadioCard.Root w="full" size="lg" colorPalette="orange" variant="solid" value={paymentMethod} onValueChange={(e) => onChange(e.value)} >
                <RadioCard.Label fontSize="md">Select payment method</RadioCard.Label>
                <HStack align="stretch">
                    {
                        collection.items.map((item) => (
                            <RadioCard.Item cursor="pointer" key={item.value} value={item.value}>
                                <RadioCard.ItemHiddenInput />
                                <RadioCard.ItemControl>
                                    <RadioCard.ItemIndicator />
                                    <RadioCard.ItemText>{item.label}</RadioCard.ItemText>
                                </RadioCard.ItemControl>
                            </RadioCard.Item>
                        ))
                    }
                </HStack>
            </RadioCard.Root>
            <Text fontWeight="bold" fontSize="sm" color="red">{errorMessage}</Text>
            {
                (paymentMethod == "CREDIT" || paymentMethod == "DEBIT") && <CheckoutPaymentCard />
            }
        </VStack>
    )
}

export default CheckoutPaymentMethod