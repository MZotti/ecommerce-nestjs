import { Box, Center, HStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

interface Props {
    label: string
    link: string
    icon: (args1: string) => React.ReactNode
    isActive: boolean
    onClick: (args1: string) => void
}

const MenuItem = ({ label, link, icon, isActive = false, onClick }: Props) => {

    return (
        <Box w="full" outline="1px solid" outlineColor={!isActive ? "gray.200" : "orange.100"} backgroundColor={!isActive ? "white" : "orange.500"} borderRadius="md" onClick={() => onClick(link)}>
            <Link to={link}>
                <Center w="full" p={4}>
                    <HStack gap={1}>
                        {icon(isActive ? "white" : "black")}
                        <Text fontWeight="bold" color={!isActive ? "black" : "white"} >{label}</Text>
                    </HStack>
                </Center>
            </Link>
        </Box>
    )
}

export default MenuItem