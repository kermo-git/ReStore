export interface Product {
    id: number
    name: string
    description: string
    price: number
    pictureURL: string
    brand: string
    type?: string
    quantityInStock?: number
}