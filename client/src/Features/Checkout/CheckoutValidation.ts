import * as yup from "yup"

const validationSchemas = [
	yup.object({ // Address form
		fullName: yup.string().required(),
		address1: yup.string().required(),
		address2: yup.string().required(),
		city: yup.string().required(),
		state: yup.string().required(),
		zip: yup.string().required(),
		country: yup.string().required()
	}),
	yup.object(), // Review order page
	yup.object({ // Payment form
		nameOnCard: yup.string().required()
	})
]

export default validationSchemas