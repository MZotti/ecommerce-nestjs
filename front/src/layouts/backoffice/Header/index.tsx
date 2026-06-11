import { Flex, HStack } from "@chakra-ui/react"
import ExpandMenu from "./ExpandMenu"
import User from "./User"
import Notifications from "./Notifications"
import HomeButton from "./HomeButton"
import { useColorModeValue } from "@/components/chakra-ui/color-mode"

const Header = () => {
    const backgroundColor = useColorModeValue("gray.50", "gray.950");
    const borderColor = useColorModeValue("gray.400", "gray.800");

    return (
        <Flex
            w="full"
            h="60px"
            pl="280px"
            pr="32px"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor={backgroundColor}
            borderBottom="1px solid"
            borderColor={borderColor}
            position="absolute"
            zIndex={0}
        >
            <HStack gap={6}>
                <ExpandMenu />
                <HomeButton />
            </HStack>
            <HStack gap={6}>
                <Notifications />
                <User />
            </HStack>
        </Flex>
    )
}

export default Header