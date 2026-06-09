import type { State } from '@/state/reducers'
import { Button, Separator, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import NoAddress from './NoAddress'
import CreateAddressModal from './CreateAddressModal'
import { useState } from 'react'
import ListAddress from './ListAddress'

const Addressses = () => {
    const auth = useSelector(({ auth }: State) => auth)
    const addresses = auth.user?.addresses || []

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const onOpen = () => setModalIsOpen(true);
    const onClose = () => setModalIsOpen(false);

    if (addresses.length == 0)
        return (
            <>
                <NoAddress onOpen={onOpen} />
                <CreateAddressModal isOpen={modalIsOpen} onClose={onClose} />
            </>
        )

    return (
        <>
            <VStack id="hey" w="full" gap={6} separator={<Separator w="full" variant="solid" />}>
                {
                    addresses.map(address => <ListAddress address={address} />)
                }
                <Button colorPalette="orange" onClick={onOpen}>Create Address</Button>
            </VStack>
            <CreateAddressModal isOpen={modalIsOpen} onClose={onClose} />
        </>
    )
}

export default Addressses