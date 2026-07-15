import LoadingBar from '@/components/LoadingBar'
import SimpleCard from '@/components/SimpleCard'
import { Center, GridItem } from '@chakra-ui/react'

const DashboardLoading = () => {
    return (
        <GridItem colSpan={{ base: 4 }}>
            <SimpleCard>
                <Center w="full" py={8}>
                    <LoadingBar label="data" />
                </Center>
            </SimpleCard>
        </GridItem>
    )
}

export default DashboardLoading