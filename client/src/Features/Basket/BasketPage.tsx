import { Button, Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"

import { useAppSelector } from "../../App/Store/ConfigureStore"
import BasketDetails from "./BasketDetails"

export default function BasketPage() {
	const {basket} = useAppSelector(state => state.basket)

	if (!basket || basket.items.length === 0)  {
		return <Typography variant="h3">You don't have any items in your basket</Typography>
	}
	return (
		<>
			<BasketDetails items={basket.items} canEdit={true}/>
			<Grid container>
				<Grid item xs={6}/>
				<Grid item xs={6}>
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