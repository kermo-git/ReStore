import { useCallback, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"

import NotFound from "../../App/Errors/NotFound"
import Loading from "../../App/Layout/Loading"
import { BasketItem } from "../../App/Models/Basket"
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore"
import BasketDetails from "../Basket/BasketDetails"
import { fetchOrdersAsync } from "./OrderSlice"

export default function OrderDetailsPage() {
	const {id} = useParams<{id: string}>()
	const idAsNumber = parseInt(id || "")

	const dispatch = useAppDispatch()
	const {orders, status} = useAppSelector(state => state.order)

	const init = useCallback(async () => {
		if (orders === null) await dispatch(fetchOrdersAsync())
	}, [dispatch])
	useEffect(() => { init() }, [init])	

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