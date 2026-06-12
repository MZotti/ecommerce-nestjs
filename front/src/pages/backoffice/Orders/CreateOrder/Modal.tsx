import ActionModal from '@/components/ActionModal'
import type ModalAction from '@/interfaces/modalAction'
import type { State } from '@/state/reducers'
import { Alert, VStack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const Modal = ({ isOpen, onClose }: Props) => {
    const navigate = useNavigate();
    const { reset } = useFormContext()

    const orders = useSelector(({ orders }: State) => orders)
    const lastOrderId = orders[0]?.id;

    const backToList = () => {
        onClose();
        navigate('../orders')
    }

    const createNewOrder = () => {
        reset();
        onClose();
    }

    const viewOrder = () => {
        onClose();
        navigate(`../orders/${lastOrderId}`);
    }

    const modalActions: ModalAction[] = [
        {
            label: "Back to List",
            callback: backToList
        },
        {
            label: "Create New Order",
            callback: createNewOrder
        },
        {
            label: "View Order",
            callback: viewOrder
        },
    ]

    return (
        <ActionModal isOpen={isOpen} onClose={onClose} canClose={false} actions={modalActions}>
            <Alert.Root status="success">
                <VStack justifyContent="center" w="full">
                    <Alert.Indicator w="26px" h="26px" />
                    <Alert.Title fontSize="lg">Order created successfully!</Alert.Title>
                </VStack>
            </Alert.Root>
        </ActionModal>
    )
}

export default Modal