import AddressModal from '@/components/AddressModal';
import { useDeleteAddress, useSetDefault } from '@/hooks/store/addresses'
import type Address from '@/interfaces/address'
import { Box, Button, Float, GridItem, HStack, Text } from '@chakra-ui/react'
import { useState } from 'react';

const ListAddress = ({ address }: { address: Address }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { mutate: setDefault, isPending: isPendingDefault } = useSetDefault();
    const { mutate: deleteAddress, isPending: isPendingDelete } = useDeleteAddress();

    const onSetAsDefault = () => {
        setDefault(address.id);
    }

    const onEdit = () => {
        setModalOpen(true)
    }

    const onRemove = () => {
        if (address.isDefault)
            return;

        deleteAddress(address.id);
    }

    return (
        <GridItem>
            <Box outline="1px solid" outlineColor={address.isDefault ? "orange.300" : "gray.200"} backgroundColor={address.isDefault ? "orange.100" : "inherit"} borderRadius="md" p={4} position="relative">
                {
                    <Float placement="top-end" offsetX={address.isDefault ? "100px" : "123px"} offsetY="25px">
                        <HStack>
                            {
                                address.isDefault ?
                                    <Text fontWeight="bold" color="orange.400">Default</Text>
                                    :
                                    <Button colorPalette="orange" variant="surface" size="xs" onClick={onSetAsDefault} disabled={isPendingDefault} loading={isPendingDefault} >Set as default</Button>
                            }
                            <Button colorPalette="orange" variant="surface" size="xs" onClick={onEdit} >Edit</Button>
                            <Button colorPalette="orange" variant="surface" size="xs" onClick={onRemove} disabled={isPendingDelete} loading={isPendingDelete} >Remove</Button>
                        </HStack>
                    </Float>
                }
                <Text fontWeight="bold">{address.name}</Text>
                <Text>{address.street}, {address.number} - {address.complement}</Text>
                <Text>{address.neighborhood}</Text>
                <Text>{address.zipCode}</Text>
                <Text>{address.city}</Text>
                <Text>{address.state} - {address.country}</Text>
            </Box>
            <AddressModal isOpen={modalOpen} onClose={() => setModalOpen(false)} existingAddress={address} />
        </GridItem>
    )
}

export default ListAddress