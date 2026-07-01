import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import ListPaymenCard from "./ListPaymenCard";
import NoCard from "./NoCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { State } from "@/state/reducers";
import { useGetPaymentCards } from "@/hooks/store/paymentCards";
import LoadingBar from "@/components/LoadingBar";
import PaymentCardModal from "@/components/PaymentCardModal";

const PaymentCards = () => {
    const cards = useSelector(({ store }: State) => store.paymentCards)
    const { isFetching } = useGetPaymentCards(cards);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const onOpen = () => setModalIsOpen(true);
    const onClose = () => setModalIsOpen(false);

    if (isFetching)
        return (
            <LoadingBar label="cards" />
        )

    if (cards.length == 0)
        return (
            <>
                <NoCard onOpen={onOpen} />
                <PaymentCardModal isOpen={modalIsOpen} onClose={onClose} />
            </>
        )

    return (
        <>
            <Flex justifyContent="end" mb={4}>
                <Button colorPalette="orange" onClick={onOpen}>Create New Card</Button>
            </Flex>
            <PaymentCardModal isOpen={modalIsOpen} onClose={onClose} />
            <SimpleGrid columns={[2]} gap={4}>
                {
                    cards.map(card => <ListPaymenCard key={card.id} card={card} />)
                }

            </SimpleGrid>
        </>
    )
}

export default PaymentCards