import { useEffect, useCallback } from "react"

import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"

import Loading from "../../App/Layout/Loading";
import { formatPrice } from "../../App/Utils";
import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { fetchOrdersAsync } from "./OrderSlice";

export default function Orders() {
	const dispatch = useAppDispatch()
	const {orders, status} = useAppSelector(state => state.order)

	const init = useCallback(async () => {
		try {
			if (orders === null) await dispatch(fetchOrdersAsync())
		} catch(error) {
			console.log(error);
		}
	}, [dispatch])

	useEffect(() => { init() }, [init])

	if (status === "pending") return <Loading message="Loading orders..."/>

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Order number</TableCell>
						<TableCell align="right">Total</TableCell>
						<TableCell align="right">Order Date</TableCell>
						<TableCell align="right">Order Status</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders?.map((order) => (
					<TableRow
						key={order.id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
						<TableCell component="th" scope="row">
							{order.id}
						</TableCell>
						<TableCell align="right">{formatPrice(order.total)}</TableCell>
						<TableCell align="right">{order.orderDate.split("T")[0]}</TableCell>
						<TableCell align="right">{order.orderStatus}</TableCell>
						<TableCell align="right">
							<Button>View</Button>
						</TableCell>
					</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}