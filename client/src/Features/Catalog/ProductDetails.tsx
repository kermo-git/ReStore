import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Agent from "../../App/API/Agent";
import { useStoreContext } from "../../App/Context/StoreContext";
import NotFound from "../../App/Errors/NotFound";
import Loading from "../../App/Layout/Loading";
import { Product } from "../../App/Models/Product";
import { formatPrice } from "../../App/Utils";

export default function ProductDetailsPage() {
	const {basket} = useStoreContext()
    const {id} = useParams<{id: string}>()

    const [product, setProduct] = useState<Product | null>(null)
	const [basketQuantity, setBasketQuantity] = useState(0)

    const [productLoading, setProductLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)

	const item = basket?.items.find(item => item.productId === product?.id)

    useEffect(() => {
		if (item) setBasketQuantity(item.quantity)
		
        Agent.Catalog.details(id || "")
        .then(product => setProduct(product))
        .catch(error => console.error(error))
        .finally(() => setProductLoading(false))
    }, [id, item])

    if (productLoading) return <Loading message="Loading product ..."/>

    if (!product) return <NotFound/>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureURL} style={{width: "100%"}}></img>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant="h4" color="secondary">
                    {formatPrice(product.price)}
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
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<TextField
							variant="outlined"
							type="number"
							label="Quantity in cart"
							fullWidth
							value={basketQuantity}
						/>
					</Grid>
					<Grid item xs={6}>
						<LoadingButton 
							sx={{height: "55px"}}
							color="primary"
							size="large"
							variant="contained"
							fullWidth
						>
							{item ? "Update Quantity" : "Add to cart"}
						</LoadingButton>
					</Grid>
				</Grid>
            </Grid>
        </Grid>
    )
}