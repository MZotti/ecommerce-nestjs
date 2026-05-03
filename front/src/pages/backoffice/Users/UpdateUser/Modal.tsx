import ActionModal from '@/components/ActionModal';
import type ModalAction from '@/interfaces/modalAction';
import { Alert, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
    isOpen: boolean
    onClose: () => void
}

const Modal = ({ isOpen, onClose }: Props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const backToList = () => {
        onClose();
        navigate('../users')
    }

    const viewUser = () => {
        onClose();
        navigate(`../users/${id}`);
    }

    const keepUpdating = () => {
        onClose();
    }

    const modalActions: ModalAction[] = [
        {
            label: "Back to List",
            callback: backToList
        },
        {
            label: "View User",
            callback: viewUser
        },
        {
            label: "Keep Updating",
            callback: keepUpdating
        },
    ]

    return (
        <ActionModal isOpen={isOpen} onClose={onClose} canClose={false} actions={modalActions}>
            <Alert.Root status="success">
                <VStack justifyContent="center" w="full">
                    <Alert.Indicator w="26px" h="26px" />
                    <Alert.Title fontSize="lg">User updated successfully!</Alert.Title>
                </VStack>
            </Alert.Root>
        </ActionModal>
    )
}

export default Modal