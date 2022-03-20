import { Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../Features/Catalog/Catalog";
import { Product } from "../Models/Product";
import Header from "./Header";

function App() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then(response => response.json())
        .then(data => setProducts(data))
    }, [])

    function addProduct() {
        const nextProductID = products.length + 1

        setProducts([...products, {
            id: nextProductID,
            name: "Product" + nextProductID,
            brand: "Some brand",
            description: "Just a product",
            price: nextProductID * 100,
            pictureURL: "http://picsum.photos/200"
        }])
    }

    return (<>
        <CssBaseline/>
        <Header/>
        <Container>
            <Catalog products={products} addProduct={addProduct}/>
        </Container>
    </>)
}

export default App;
