import ActionModal from '@/components/ActionModal'
import type ModalAction from '@/interfaces/modalAction'
import type { State } from '@/state/reducers'
import { Alert, VStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Props {
    isOpen: boolean
    onClose: () => void
}

const Modal = ({ isOpen, onClose }: Props) => {
    const navigate = useNavigate();

    const users = useSelector(({ users }: State) => users)
    const lastUserId = users[0]?.id;

    const backToList = () => {
        onClose();
        navigate('../users')
    }

    const createNewUser = () => {
        onClose();
    }

    const viewUser = () => {
        onClose();
        navigate(`../users/${lastUserId}`);
    }

    const modalActions: ModalAction[] = [
        {
            label: "Back to List",
            callback: backToList
        },
        {
            label: "Create New User",
            callback: createNewUser
        },
        {
            label: "View User",
            callback: viewUser
        },
    ]

    return (
        <ActionModal isOpen={isOpen} onClose={onClose} canClose={false} actions={modalActions}>
            <Alert.Root status="success">
                <VStack justifyContent="center" w="full">
                    <Alert.Indicator w="26px" h="26px" />
                    <Alert.Title fontSize="lg">User created successfully!</Alert.Title>
                </VStack>
            </Alert.Root>
        </ActionModal>
    )
}

export default Modal