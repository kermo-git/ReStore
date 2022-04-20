import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Agent from "../../App/API/Agent";
import Loading from "../../App/Layout/Loading";
import { Basket } from "../../App/Models/Basket";

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
	
	return <Typography variant="h3">BuyerId = {basket.buyerId}</Typography>
}