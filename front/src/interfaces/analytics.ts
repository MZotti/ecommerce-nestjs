export interface ProductsAnalytics {
    stock: ProductsStock
    price: ProductsPrice[]
    bestSelling: BestSaleProduct[]
    mostRentable: BestSaleProduct[]
}

export interface ProductsStock {
    good: number
    low: number
    empty: number
}

export interface ProductsPrice {
    from: number
    to: number
    value: number
}

export interface BestSaleProduct {
    name: string,
    value: number
}

export interface OrdersAnalytics {
    ordersPerMonth: MonthOrders[],
    paymentMethods: LabelAndValue[],
    ordersStatus: LabelAndValue[]
}

export interface MonthOrders {
    label: string,
    value: number
}

export interface LabelAndValue {
    label: string,
    value: number
}