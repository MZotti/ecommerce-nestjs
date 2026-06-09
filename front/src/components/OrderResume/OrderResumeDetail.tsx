import { Flex } from '@chakra-ui/react'
import React from 'react'

const OrderResumeDetail = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex w="full" justifyContent="space-between">
            {children}
        </Flex>
    )
}

export default OrderResumeDetail