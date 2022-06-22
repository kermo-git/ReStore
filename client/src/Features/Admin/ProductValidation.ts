import * as yup from "yup"

export const validationSchema = yup.object({
	name: yup.string().required(),
	description: yup.string().required(),
	price: yup.number().required().moreThan(100),
	brand: yup.string().required(),
	type: yup.string().required(),
	quantityInStock: yup.string().required().min(0),
	file: yup.mixed().when("pictureURL", {
		is: (value: string) => !value,
		then: yup.mixed().required()
	})
})