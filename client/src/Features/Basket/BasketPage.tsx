import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";

import Agent from "../../App/API/Agent";
import { useStoreContext } from "../../App/Context/StoreContext";
import { formatPrice } from "../../App/Utils";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
	const {basket, setBasket, removeItem} = useStoreContext()
	const [loadingName, setLoadingName] = useState("")

	if (!basket) return <Typography variant="h3">You don't have any items in your basket</Typography>

	function handleAddItem(productId: number, loadingName: string) {
		setLoadingName(loadingName)

		Agent.Basket.addItem(productId, 1)
		.then((basket) => setBasket(basket))
		.catch(error => console.log(error))
		.finally(() => setLoadingName(""))
	}

	function handleRemoveItem(productId: number, quantity: number, loadingName: string) {
		setLoadingName(loadingName)
		
		Agent.Basket.removeItem(productId, quantity)
		.then(() => removeItem(productId, quantity))
		.catch(error => console.log(error))
		.finally(() => setLoadingName(""))
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Prduct</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="center">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.items.map((item) => {
							const removeName = "rem" + item.productId
							const deleteName = "del" + item.productId
							const addName = "add" + item.productId

							return <TableRow
								key={item.productId}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
								<TableCell component="th" scope="row">
									<Box display="flex" alignItems="center">
										<img src={item.pictureURL} alt={item.name} style={{height: 50, marginRight: 20}}/>
										<span>{item.name}</span>
									</Box>
								</TableCell>
								<TableCell align="right">{formatPrice(item.price)}</TableCell>
								<TableCell align="center">
									<LoadingButton 
										loading={loadingName == removeName} 
										onClick={() => handleRemoveItem(item.productId, 1, removeName)} 
										color="error">
										<Remove/>
									</LoadingButton>
									{item.quantity}
									<LoadingButton 
										loading={loadingName == addName} 
										onClick={() => handleAddItem(item.productId, addName)} 
										color="secondary">
										<Add/>
									</LoadingButton>
								</TableCell>
								<TableCell align="right">{formatPrice(item.price * item.quantity)}</TableCell>
								<TableCell align="right">
									<LoadingButton 
										loading={loadingName == deleteName} 
										onClick={() => handleRemoveItem(item.productId, item.quantity, deleteName)} 
										color="error">
										<Delete/>
									</LoadingButton>
								</TableCell>
							</TableRow>
						})}
					</TableBody>
				</Table>
			</TableContainer>	
			<Grid container>
				<Grid item xs={6}/>
				<Grid item xs={6}>
					<BasketSummary/>
					<Button
						component={Link}
						to="/checkout"
						variant="contained"
						size="large"
						fullWidth
					>
						Checkout
					</Button>
				</Grid>
			</Grid>	
		</>
	);
}