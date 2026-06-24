import { Button, Separator, VStack } from "@chakra-ui/react";
import ListPaymenCard from "./ListPaymenCard";
import type PaymentCard from "@/interfaces/paymentCard";
import NoCard from "./NoCard";
import CreatePaymentCardModal from "./CreatePaymentCardModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { State } from "@/state/reducers";
import { useGetPaymentCards } from "@/hooks/store/paymentCards";
import LoadingBar from "@/components/LoadingBar";

const PaymentCards = () => {
    const { paymentCards } = useSelector(({ store }: State) => store.customer)
    const { isFetching } = useGetPaymentCards(paymentCards);
    const cards = paymentCards || []

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const onOpen = () => setModalIsOpen(true);
    const onClose = () => setModalIsOpen(false);

    if (isFetching)
        return (
            <LoadingBar label="cards" />
        )

    if (cards.length == 0 )
        return (
            <>
                <NoCard onOpen={onOpen} />
                <CreatePaymentCardModal isOpen={modalIsOpen} onClose={onClose} />
            </>
        )

    return (
        <>
            <VStack gap={6} separator={<Separator w="full" variant="solid" />}>
                {
                    cards?.map((el: PaymentCard) => <ListPaymenCard card={el} />)
                }
                <Button colorPalette="orange" onClick={onOpen}>Create Payment Card</Button>
            </VStack>
            <CreatePaymentCardModal isOpen={modalIsOpen} onClose={onClose} />
        </>
    )
}

export default PaymentCards