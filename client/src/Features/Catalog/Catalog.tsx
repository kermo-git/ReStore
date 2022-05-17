import { useState, useEffect } from "react";

import Agent from "../../App/API/Agent";
import Loading from "../../App/Layout/Loading";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        Agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.error(error))
		.finally(() => setLoading(false))
    }, [])
    
	if (loading) return <Loading message="Loading products ..."/>

    return (<ProductList products={products}/>)
}