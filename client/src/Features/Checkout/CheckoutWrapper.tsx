import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutPage from "./CheckoutPage";
import { useAppDispatch } from "../../App/Store/ConfigureStore";
import Agent from "../../App/API/Agent";
import Loading from "../../App/Layout/Loading";
import { setBasket } from "../Basket/BasketSlice";

const stripePromise = loadStripe("pk_test_51LAsvKHNKzT2V29Ne2zXEFzHQ11tvn4wzWNCCa33iDgmRhExH9vyouLBU79utGFXMwKZdVBHaX9z4Zb26H8lEJFb00dNpVD8rs");

export default function CheckoutWrapper() {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		Agent.Payment.createPaymentIntent()
			.then(basket => dispatch(setBasket(basket)))
			.catch(error => console.log(error))
			.finally(() => setLoading(false))
	}, [dispatch])

	if (loading) return <Loading message="Loading checkout..."/>

	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage/>	
		</Elements>
	)
}