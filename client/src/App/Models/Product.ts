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

export interface ProductParams {
	orderBy: string
	searchTerm?: string
	brands: string[]
	types: string[]
	pageNumber: number
    pageSize: number
}