import { LoadingButton } from "@mui/lab"
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import Agent from "../../App/API/Agent"
import NotFound from "../../App/Errors/NotFound"
import Loading from "../../App/Layout/Loading"
import { Product } from "../../App/Models/Product"
import { formatPrice } from "../../App/Utils"
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore"
import { addBasketItemAsync, removeBasketItemAsync } from "../Basket/BasketSlice"

export default function ProductDetailsPage() {
	const {basket, status} = useAppSelector(state => state.basket)
	const dispatch = useAppDispatch()
    const {id} = useParams<{id: string}>()

    const [product, setProduct] = useState<Product | null>(null)
	const [basketQuantity, setBasketQuantity] = useState(0)

    const [productLoading, setProductLoading] = useState(true)

	const basketItem = basket?.items.find(item => item.productId === product?.id)

    useEffect(() => {
		if (basketItem) setBasketQuantity(basketItem.quantity)

        Agent.Catalog.details(id || "")
        .then(product => setProduct(product))
        .catch(error => console.error(error))
        .finally(() => setProductLoading(false))
    }, [id, basketItem])

    if (productLoading) return <Loading message="Loading product ..."/>

    if (!product) return <NotFound/>

	function handleInputChange(ev: any) {
		const fieldValue = parseInt(ev.target.value)
		if (fieldValue >= 0) setBasketQuantity(fieldValue)
	}

	function handleUpdateBasket() {
		const id = product!.id

		if (!basketItem || basketItem.quantity < basketQuantity) {
			const updatedQuantity = basketItem ? basketQuantity - basketItem.quantity : basketQuantity
			dispatch(addBasketItemAsync({productId: id, quantity: updatedQuantity}))
		} else {
			const updatedQuantity = basketItem.quantity - basketQuantity
			dispatch(removeBasketItemAsync({productId: id, quantity: updatedQuantity}))
		}
	}

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureURL} style={{width: "100%"}} alt=""></img>
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
							onChange={handleInputChange}
							variant="outlined"
							type="number"
							label="Quantity in cart"
							fullWidth
							value={basketQuantity}
						/>
					</Grid>
					<Grid item xs={6}>
						<LoadingButton 
							disabled={(basketItem?.quantity === basketQuantity) || (!basketItem && basketQuantity === 0)}						
							loading={status.includes("pending")}
							onClick={handleUpdateBasket}
							sx={{height: "55px"}}
							color="primary"
							size="large"
							variant="contained"
							fullWidth
						>
							{basketItem ? "Update Quantity" : "Add to cart"}
						</LoadingButton>
					</Grid>
				</Grid>
            </Grid>
        </Grid>
    )
}