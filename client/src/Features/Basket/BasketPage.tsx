import { Delete } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Agent from "../../App/API/Agent";
import Loading from "../../App/Layout/Loading";
import { Basket } from "../../App/Models/Basket";
import { formatPrice } from "../../App/Utils";

export default function BasketPage() {
	const [loading, setLoading] = useState<boolean>(true)
	const [basket, setBasket] = useState<Basket | null>(null)

	useEffect(() => {
		Agent.Basket.get()
			.then(basket => setBasket(basket))
			.catch(error => console.error(error))
			.finally(() => setLoading(false))
	}, [])

	if (loading) return <Loading message="Loading basket ..."/>
	if (!basket) return <Typography variant="h3">You don't have any items in your basket</Typography>

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Prduct</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Quantity</TableCell>
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
							{item.name}
							</TableCell>
							<TableCell align="right">{formatPrice(item.price)}</TableCell>
							<TableCell align="right">{item.quantity}</TableCell>
							<TableCell align="right">{formatPrice(item.price * item.quantity)}</TableCell>
							<TableCell align="right">
								<IconButton color="error">
									<Delete/>
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}