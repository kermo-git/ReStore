import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Agent from "../../App/API/Agent";
import { Product } from "../../App/Models/Product";

export default function ProductDetailsPage() {
    const {id} = useParams<{id: string}>()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        Agent.Catalog.details(id || "")
        .then(product => setProduct(product))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }, [id])

    if (loading)
        return (
            <Typography variant="h1">
                Loading ...
            </Typography>
        )

    if (!product)
        return (
            <Typography variant="h1">
                Product not found
            </Typography>
        )

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureURL} style={{width: "100%"}}></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant="h4" color="secondary">
                    {(product.price / 100).toFixed(2)} €
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}