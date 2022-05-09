import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

import Agent from "../../App/API/Agent";
import { useStoreContext } from "../../App/Context/StoreContext";
import { formatPrice } from "../../App/Utils";

export default function BasketPage() {
	const {basket, setBasket, removeItem} = useStoreContext()
	const [loading, setLoading] = useState(false)

	if (!basket) return <Typography variant="h3">You don't have any items in your basket</Typography>

	function handleAddItem(productId: number) {
		setLoading(true)

		Agent.Basket.addItem(productId, 1)
		.then((basket) => setBasket(basket))
		.catch(error => console.log(error))
		.finally(() => setLoading(false))
	}

	function handleRemoveItem(productId: number, quantity: number = 1) {
		setLoading(true)
		
		Agent.Basket.removeItem(productId, quantity)
		.then(() => removeItem(productId, quantity))
		.catch(error => console.log(error))
		.finally(() => setLoading(false))
	}

	return (
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
					{basket.items.map((item) => (
						<TableRow
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
								<LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId)} color="error">
									<Remove/>
								</LoadingButton>
								{item.quantity}
								<LoadingButton loading={loading} onClick={() => handleAddItem(item.productId)} color="secondary">
									<Add/>
								</LoadingButton>
							</TableCell>
							<TableCell align="right">{formatPrice(item.price * item.quantity)}</TableCell>
							<TableCell align="right">
								<LoadingButton loading={loading} onClick={() => handleRemoveItem(item.productId, item.quantity)} color="error">
									<Delete/>
								</LoadingButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}