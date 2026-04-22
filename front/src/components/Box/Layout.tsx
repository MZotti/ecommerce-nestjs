import { Flex } from '@chakra-ui/react'
import { type ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Flex p={4} outline="0.2px solid">
            {children}
        </Flex>
    )
}

export default Layout