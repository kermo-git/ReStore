import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import BasketSummary from "./BasketSummary"
import { useAppSelector } from "../../App/Store/ConfigureStore"
import BasketTable from "./BasketTable"

export default function BasketPage() {
	const {basket} = useAppSelector(state => state.basket)

	if (!basket) return <Typography variant="h3">You don't have any items in your basket</Typography>
	return (
		<>
			<BasketTable items={basket.items}/>
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
	)
}