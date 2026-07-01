import FormContainer from "@/components/Form/FormContainer"
import NumberInput from "@/components/Inputs/NumberInput"
import { useFetchDataContext } from "@/contexts/FetchDataContext"
import { useIncreaseProductStock } from "@/hooks/backoffice/products"
import type Product from "@/interfaces/product"
import { Button, CloseButton, Dialog, HStack, Portal } from "@chakra-ui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, type SubmitHandler } from "react-hook-form"
import { schema } from "./schema"
import { toaster } from "@/components/chakra-ui/toaster"

interface Props {
    isOpen: boolean
    onClose: () => void
}

interface StockFormData {
    quantity: number
}

const IncreaseStockModal = ({ isOpen, onClose }: Props) => {
    const { data: product } = useFetchDataContext<Product>();

    const methods = useForm<StockFormData>({
        defaultValues: {
            quantity: 1,
        },
        resolver: yupResolver(schema)
    });

    const {
        handleSubmit
    } = methods

    const { mutate: updateStock, isPending } = useIncreaseProductStock({
        onSuccess: () => {
            toaster.create({
                description: "Stock updated",
                type: "success",
            })
            onClose()
        },
        onError: (error) => {
            toaster.create({
                description: error.response.data.message,
                type: "error",

            })
        }
    })


    const onSubmit: SubmitHandler<StockFormData> = async (data) => {
        updateStock({
            id: product.id,
            formData: {
                quantity: Number(data.quantity)
            }
        })
    }

    return (
        <Dialog.Root size="xs" placement="center" open={isOpen}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Increase Product Stock
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FormContainer
                                    methods={methods}
                                    columns={1}
                                    isLoadingSubmit={isPending}
                                >
                                    <NumberInput id="quantity" label="Quantity" required />
                                    <HStack justifyContent="end">
                                        <Button colorPalette="grey" onClick={onClose} disabled={isPending} loading={isPending}>Cancel</Button>
                                        <Button colorPalette="green" type="submit" disabled={isPending} loading={isPending}>Increase Stock</Button>
                                    </HStack>
                                </FormContainer>
                            </form>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" onClick={onClose} disabled={isPending} />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default IncreaseStockModal