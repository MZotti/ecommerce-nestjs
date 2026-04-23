import { Box, Separator, Text, VStack } from "@chakra-ui/react"
import NavMenu from "./NavMenu"
import { useColorModeValue } from "@/components/chakra-ui/color-mode";

const NavBar = () => {
    const backgroundColor = useColorModeValue("gray.200", "gray.800");
    const borderColor = useColorModeValue("gray.400", "gray.600");

    return (
        <Box
            w="240px"
            h="full"
            backgroundColor={backgroundColor}
            position="absolute"
            borderRight="1px solid"
            borderColor={borderColor}
            zIndex={1}
        >
            <VStack mt="8" gap={8}>
                <Text fontSize="md">Logo</Text>
                <Separator h="1.5px" backgroundColor="white" w="full" />
                <NavMenu />
            </VStack>
        </Box>
    )
}

export default NavBar