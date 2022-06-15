import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe("pk_test_51LAsvKHNKzT2V29Ne2zXEFzHQ11tvn4wzWNCCa33iDgmRhExH9vyouLBU79utGFXMwKZdVBHaX9z4Zb26H8lEJFb00dNpVD8rs");

export default function CheckoutWrapper() {
	return (
		<Elements stripe={stripePromise}>
			<CheckoutPage/>	
		</Elements>
	)
}