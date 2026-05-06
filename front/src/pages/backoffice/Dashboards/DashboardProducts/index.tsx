import { SimpleGrid } from "@chakra-ui/react"
import TopSaleProducts from "./TopSaleProductsChart"
import TopRentableProductsChart from "./TopRentableProductsChart"
import ProductsStockChart from "./ProductsStockChart"
import ProductsPriceAreaChart from "./ProductsPriceAreaChart"

const DashboardProducts = () => {
    return (
        <SimpleGrid w="full" columns={4} gap={4} gridTemplateRows="max-content">
            <TopSaleProducts />
            <TopRentableProductsChart />
            <ProductsPriceAreaChart />
            <ProductsStockChart />
        </SimpleGrid>
    )
}

export default DashboardProducts