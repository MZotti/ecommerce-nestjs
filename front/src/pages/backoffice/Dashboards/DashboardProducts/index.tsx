import { Button, SimpleGrid, VStack } from "@chakra-ui/react"
import TopSaleProducts from "./TopSaleProductsChart"
import TopRentableProductsChart from "./TopRentableProductsChart"
import ProductsStockChart from "./ProductsStockChart"
import ProductsPriceAreaChart from "./ProductsPriceAreaChart"
import { useAnalyticsFilters, useGetProductsAnalytics } from "@/hooks/backoffice/analytics"
import DashboardLoading from "../DashboardLoading"
import DashboardFilters from "../DashboardFilters"
import FilterFields from "./FilterFields"

const DashboardProducts = () => {
    const { filters, setFilters } = useAnalyticsFilters();
    const { data, isFetching } = useGetProductsAnalytics(filters);

    return (
        <VStack w="full">
            <DashboardFilters filterFields={FilterFields} setFilters={setFilters} />
            <SimpleGrid w="full" columns={4} gap={4} gridTemplateRows="max-content">
                {
                    isFetching || data === undefined ?
                        <DashboardLoading />
                        :
                        <>
                            <TopSaleProducts data={data.bestSelling} />
                            <TopRentableProductsChart data={data.mostRentable} />
                            <ProductsPriceAreaChart data={data.price} />
                            <ProductsStockChart data={data.stock} />
                        </>
                }
            </SimpleGrid>
        </VStack>
    )
}

export default DashboardProducts