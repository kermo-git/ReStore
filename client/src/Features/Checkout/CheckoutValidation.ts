import * as yup from "yup"

export const validationSchema = yup.object({
	fullName: yup.string().required(),
	address1: yup.string().required(),
	address2: yup.string().required(),
	city: yup.string().required(),
	state: yup.string().required(),
	zip: yup.string().required(),
	country: yup.string().required()
})