import { Link, useParams } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"

import NotFound from "../../App/Errors/NotFound"
import Loading from "../../App/Layout/Loading"
import { BasketItem } from "../../App/Models/Basket"
import BasketDetails from "../Basket/BasketDetails"
import { useOrders } from "../../App/Hooks/UseOrders"

export default function OrderDetailsPage() {
	const {id} = useParams<{id: string}>()
	const idAsNumber = parseInt(id || "")

	const {orders, status} = useOrders()
	if (status === "pending") return <Loading message="Loading orders..."/>

	const order = orders && orders.find(order => order.id === idAsNumber)
	if (!order) return <NotFound/>

	return (<>
		<Box 
			display="flex" 
			alignItems="center" 
			justifyContent="space-between" 
			sx={{mb: 2}}
		>
			<Typography variant="h3">Order #{id}</Typography>
			<Button variant="contained" component={Link} to="/orders">Back to Orders</Button>	
		</Box>
		<BasketDetails items={order.orderItems as BasketItem[]} canEdit={false}/>
	</>)
}