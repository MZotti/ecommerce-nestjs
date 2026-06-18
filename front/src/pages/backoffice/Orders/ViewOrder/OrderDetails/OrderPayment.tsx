import DataDisplay from '@/components/DataDisplay'
import { useFetchDataContext } from '@/contexts/FetchDataContext';
import { niceCardBrand } from '@/enums/paymentCard';
import { getCardBrandLogo } from '@/functions/paymentCard';
import type Order from '@/interfaces/order';
import { Grid, HStack, Image, Text, VStack } from '@chakra-ui/react'

const OrderPayment = () => {
    const { data: order } = useFetchDataContext<Order>();
    const orderPayment = order?.orderPayment;

    return (
        <VStack gap={4} w="full">
            <Text fontSize="md" fontWeight="bold" textAlign="left">Payment details</Text>
            <Grid
                w="full"
                templateColumns="repeat(2, 1fr)" gap={4}
            >
                <DataDisplay label="Card Info" colSpan={2}>
                    <HStack>
                        <Image src={String(getCardBrandLogo(orderPayment?.cardBrand))} width="30px" />
                        <Text fontSize="md">{niceCardBrand[orderPayment?.cardBrand]}</Text>
                        <Text fontSize="md">**** **** **** {orderPayment?.cardLast4}</Text>
                    </HStack>
                </DataDisplay>
                <DataDisplay label="Expires">
                    <Text fontSize="md">{orderPayment?.cardExpiresMonth}/{orderPayment?.cardExpiresYear}</Text>
                </DataDisplay>
                <DataDisplay label="Holder Name">
                    <Text fontSize="md">{orderPayment?.cardHolderName}</Text>
                </DataDisplay>
            </Grid>
        </VStack>
    )
}

export default OrderPayment