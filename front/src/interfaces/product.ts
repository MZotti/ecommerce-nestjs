export default interface Product {
    id: number
    category: Category
    name: string
    slug: string
    description: string
    price: number
    stock: number
    imageUrl?: string
}

export interface Category {
    id: number
    name: string
}