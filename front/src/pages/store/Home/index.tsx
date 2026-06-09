import TopSaleProducts from "./TopSaleProducts"
import NewestProducts from "./NewestProducts"
import { Separator, VStack } from "@chakra-ui/react"
import OnSaleProducts from "./OnSaleProducts"

const Home = () => {
    return (
        <VStack w="full" gap={8} separator={<Separator w="full" />}>
            <OnSaleProducts />
            <TopSaleProducts />
            <NewestProducts />
        </VStack>
    )
}

export default Home