import { useFetchDataContext } from '@/contexts/FetchDataContext'
import { Box, GridItem, Skeleton, Text, VStack } from '@chakra-ui/react'
import type React from 'react'

interface Props {
    label: string
    children: React.ReactNode,
    colSpan?: number
}

const DataDisplay = ({ label, children, colSpan = 1 }: Props) => {
    const { isLoading } = useFetchDataContext();

    return (
        <GridItem colSpan={colSpan}>
            <VStack w="full" gap={2} textAlign="left" justifyContent="start" alignItems="center">
                <Text fontSize="md" fontWeight="bold" w="full">{label}</Text>
                <Skeleton loading={isLoading} asChild>
                    <Box w="full">{children}</Box>
                </Skeleton>
            </VStack>
        </GridItem>
    )
}

export default DataDisplay