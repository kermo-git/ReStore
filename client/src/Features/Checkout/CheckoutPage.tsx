import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import validationSchemas from "./CheckoutValidation";
import Agent from "../../App/API/Agent";
import { useAppDispatch } from "../../App/Store/ConfigureStore";
import { clearBasket } from "../Basket/BasketSlice";
import { fetchOrdersAsync } from "../Orders/OrderSlice";

const steps = ['Shipping address', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <Review />;
		case 2:
			return <PaymentForm />;
		default:
			throw new Error('Unknown step');
	}
}

export default function CheckoutPage() {
	const [activeStep, setActiveStep] = useState(0)
	const [orderNumber, setOrderNumber] = useState(0)
	const [loading, setLoading] = useState(false)

	const dispatch = useAppDispatch()

	const methods = useForm({
		mode: "all",
		resolver: yupResolver(validationSchemas[activeStep])
	})

	useEffect(() => {
		Agent.Account.fetchAddress()
			.then(response => {
				if (response) {
					methods.reset({...methods.getValues(), ...response, saveAddress: false})
				}
			})
	}, [methods])

	const handleNext = async (data: FieldValues) => {
		const {nameOnCard, saveAddress, ...shippingAddress} = data

		if (activeStep === steps.length - 1) {
			setLoading(true)
			try {
				const newOrderNumber = await Agent.Orders.create({saveAddress, shippingAddress})
				setOrderNumber(newOrderNumber)
				dispatch(clearBasket())
				dispatch(fetchOrdersAsync())
				setActiveStep(activeStep + 1)
			} catch(error) {
				console.log(error)
			}
			setLoading(false)
		} else {
			setActiveStep(activeStep + 1)
		}
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<FormProvider {...methods}>
			<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				<Typography component="h1" variant="h4" align="center">
					Checkout
				</Typography>
				<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<>
					{activeStep === steps.length ? (
						<>
							<Typography variant="h5" gutterBottom>
								Thank you for your order.
							</Typography>
							<Typography variant="subtitle1">
								Your order number is #{orderNumber}. We have not emailed your order
								confirmation, and will not send you an update when your order has
								shipped as this is a fake store!
							</Typography>
						</>
					) : (
						<form onSubmit={methods.handleSubmit(handleNext)}>
							{getStepContent(activeStep)}
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
										Back
									</Button>
								)}
								<LoadingButton
									loading={loading}
									variant="contained"
									type="submit"
									disabled={!methods.formState.isValid}
									sx={{ mt: 3, ml: 1 }}
								>
									{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
								</LoadingButton>
							</Box>
						</form>
					)}
				</>
			</Paper>
		</FormProvider>
	);
}