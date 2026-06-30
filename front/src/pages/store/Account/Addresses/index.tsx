import type { State } from '@/state/reducers'
import { Button, Flex, SimpleGrid } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import NoAddress from './NoAddress'
import CreateAddressModal from '../../../../components/AddressModal'
import { useState } from 'react'
import ListAddress from './ListAddress'
import { useGetAddresses } from '@/hooks/store/addresses'
import LoadingBar from '@/components/LoadingBar'

const Addressses = () => {
    const addresses = useSelector(({ store }: State) => store.addresses)
    const { isFetching } = useGetAddresses(addresses);

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const onOpen = () => setModalIsOpen(true);
    const onClose = () => setModalIsOpen(false);

    if (isFetching)
        return (
            <LoadingBar label="addresses" />
        )

    if (addresses.length == 0)
        return (
            <>
                <NoAddress onOpen={onOpen} />
                <CreateAddressModal isOpen={modalIsOpen} onClose={onClose} />
            </>
        )

    return (
        <>
            <Flex justifyContent="end" mb={4}>
                <Button colorPalette="orange" onClick={onOpen}>Create New Address</Button>
            </Flex>
            <CreateAddressModal isOpen={modalIsOpen} onClose={onClose} />
            <SimpleGrid columns={[2]} gap={4}>
                {
                    addresses.map(address => <ListAddress key={address.id} address={address} />)
                }

            </SimpleGrid>
        </>
    )
}

export default Addressses