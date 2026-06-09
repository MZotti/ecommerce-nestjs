import { toaster } from '@/components/chakra-ui/toaster';
import OrderResume from '@/components/OrderResume'
import SimpleCard from '@/components/SimpleCard'
import { useCreateOrder } from '@/hooks/store/orders';
import { cartCreator } from '@/state';
import type { State } from '@/state/reducers';
import { Box, Button, createListCollection, Flex, HStack, RadioGroup, Select, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const Checkout = () => {
    const navigate = useNavigate();
    const cart = useSelector(({ cart }: State) => cart)
    const auth = useSelector(({ auth }: State) => auth)
    const addresses = auth.user?.addresses || []

    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const [addressId, setAddressId] = useState<number>(0);

    const dispatch = useDispatch()
    const { clearCartAction } = bindActionCreators(cartCreator, dispatch)

    const { mutateAsync: createOrder, isPending, isSuccess } = useCreateOrder();

    const collection = createListCollection({
        items: [
            { value: "PIX", label: "PIX" },
            { value: "PAYMENT_ORDER", label: "PAYMENT ORDER" },
            { value: "CREDIT", label: "CREDIT" },
            { value: "DEBIT", label: "DEBIT" }
        ]
    })

    const onChange = (value: string[]) => setPaymentMethod(value[0])

    const onFinish = async () => {
        if (!auth.user) {
            toaster.create({
                description: "Login first",
                type: "warning",
            })
            return;
        }

        const selectedAddress = addresses.find(add => add.id === addressId);

        if (addressId === 0 || selectedAddress == undefined) {
            toaster.create({
                description: "Select address",
                type: "warning",
            })
            return;
        }

        if (paymentMethod === "") {
            toaster.create({
                description: "Select payment method",
                type: "warning",
            })
            return;
        }

        const formData = {
            items: cart,
            paymentMethod,
            shippingZipCode: selectedAddress.zipCode,
            shippingStreet: selectedAddress.street,
            shippingNumber: selectedAddress.number,
            shippingComplement: selectedAddress.complement,
            shippingNeighborhood: selectedAddress.neighborhood,
            shippingCity: selectedAddress.city,
            shippingState: selectedAddress.state,
            shippingCountry: selectedAddress.country,
        }

        createOrder(formData);
    }

    useEffect(() => {
        if (isSuccess) {
            toaster.create({
                description: "Order created",
                type: "success",
            })

            clearCartAction();
            navigate("/")
        }
    }, [isSuccess])

    return (
        <Flex w="full" px="400px" gap={2}>
            <Flex flexGrow={2}>
                <SimpleCard title='Finish order'>
                    <VStack alignItems="start">
                        <Text>
                            Select payment method
                        </Text>
                        <Select.Root name="Payment method" value={[paymentMethod]} collection={collection} onValueChange={({ value }) => onChange(value)} size="sm" width="320px"  >
                            <Select.HiddenSelect />
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder={`Select`} />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Select.Positioner>
                                <Select.Content>
                                    {collection.items.map((item) => (
                                        <Select.Item item={item} key={item.value}>
                                            {item.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Select.Root>
                    </VStack>
                    <Box>
                        <Text>Select shipping address</Text>
                        <RadioGroup.Root defaultValue="1" value={String(addressId)} onValueChange={(e) => setAddressId(Number(e.value))}>
                            <HStack gap="6">
                                {addresses.map((address) => (
                                    <RadioGroup.Item key={address.id} value={String(address.id)} >
                                        <RadioGroup.ItemHiddenInput />
                                        <RadioGroup.ItemIndicator />
                                        <RadioGroup.ItemText>{address.name}</RadioGroup.ItemText>
                                    </RadioGroup.Item>
                                ))}
                            </HStack>
                        </RadioGroup.Root>
                    </Box>
                </SimpleCard>
            </Flex>
            <OrderResume actionButton={<Button w="full" colorPalette="orange" onClick={onFinish} disabled={isPending} loading={isPending}>Finish</Button>} />
        </Flex>
    )
}

export default Checkout