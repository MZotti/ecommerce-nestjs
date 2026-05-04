import { useFetchDataContext } from '@/contexts/FetchDataContext'
import { Box, Skeleton, Text, VStack } from '@chakra-ui/react'
import type React from 'react'

interface Props {
    label: string
    children: React.ReactNode
}

const DataDisplay = ({ label, children }: Props) => {
    const { isLoading } = useFetchDataContext();

    return (
        <VStack w="full" gap={2} textAlign="left" justifyContent="start" alignItems="center">
            <Text fontSize="md" fontWeight="bold" w="full">{label}</Text>
            <Skeleton loading={isLoading} w="full">
                <Box w="full">{children}</Box>
            </Skeleton>
        </VStack>
    )
}

export default DataDisplay