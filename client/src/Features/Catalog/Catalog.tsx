import { useState, useEffect } from "react";
import Agent from "../../App/API/Agent";
import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";


export default function Catalog() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        Agent.Catalog.list()
        .then(products => setProducts(products))
        .catch(error => console.error(error))
    }, [])
    
    return (<ProductList products={products}/>)
}