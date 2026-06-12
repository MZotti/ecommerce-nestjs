import { Dialog, Portal } from "@chakra-ui/react"
import Login from "./Login"
import Register from "./Register"
import { useCustomerLoginContext } from "@/contexts/CustomerLoginContext"
import { LightMode } from "@/components/chakra-ui/color-mode"

const CustomerLogin = () => {
    const { isOpen, setIsOpen, display } = useCustomerLoginContext();

    return (
        <Dialog.Root
            placement="center"
            motionPreset="slide-in-bottom"
            open={isOpen}
            closeOnEscape
            closeOnInteractOutside
            onOpenChange={(e) => setIsOpen(e.open)}
            size="xs"
        >
            <Portal>
                <LightMode>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        {
                            display == "login" ? <Login /> : <Register />
                        }
                    </Dialog.Positioner>
                </LightMode>
            </Portal>
        </Dialog.Root>
    )
}

export default CustomerLogin