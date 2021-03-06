import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"

import { history } from "../.."
import { PaginatedResponse } from "../Models/Pagination"
import { store } from "../Store/ConfigureStore"

const sleep = () => new Promise(resolve => setTimeout(resolve, 300))

axios.defaults.baseURL = process.env.REACT_APP_API_URL
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
	const token = store.getState().account.user?.token
	if (token && config.headers) {
		config.headers.Authorization = "Bearer " + token
	}
	return config
})

axios.interceptors.response.use(
    async response => {
		if (process.env.NODE_ENV === "development") await sleep()
		const pagination = response.headers["pagination"]
		if (pagination) {
			response.data = new PaginatedResponse(response.data, JSON.parse(pagination))
		}
        return response
    }, 
    (error: AxiosError) => {
        const {data, status} = error.response!
        switch (status) {
            case 400:
                if (data.errors) {
                    const errorMessages: string[][] = []

                    for (const key in data.errors) {
                        errorMessages.push(data.errors[key])
                    }
                    throw errorMessages.flat()
                }
                toast.error(data.title)
                break
            case 401:
                toast.error(data.title)
                break
            case 403:
                toast.error("You are not allowed to do that!")
                break
            case 500:
                history.push("/server-error", data)
                break
            default:
                console.log("Caught by interceptor")
                break
        }
        return Promise.reject(error.response)
    }
)
const responseBody = (response: AxiosResponse) => response.data

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body?: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body?: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
	postForm: (url: string, data: FormData) => axios.post(url, data, {
		headers: {"Content-type": "multipart/form-data"}
	}).then(responseBody),
	putForm: (url: string, data: FormData) => axios.put(url, data, {
		headers: {"Content-type": "multipart/form-data"}
	}).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get("products", params),
    details: (id: number) => requests.get("products/" + id),
	filters: () => requests.get("products/filters")
}

const Basket = {
	get: () => requests.get("basket"),
	addItem: (productId: number, quantity: number = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`),
	removeItem: (productId: number, quantity: number = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const TestErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorized"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error")
}

const Account = {
	login: (values: any) => requests.post("account/login", values),
	register: (values: any) => requests.post("account/register", values),
	currentUser: () => requests.get("account/currentUser"),
	fetchAddress: () => requests.get("account/savedAddress")
}

const Orders = {
	list: () => requests.get("orders"),
	fetch: (id: number) => requests.get("orders/" + id),
	create: (values: any) => requests.post("orders", values)
}

const Payment = {
	createPaymentIntent: () => requests.post("payment")
}

function createFormData(item: any) {
	const result = new FormData()
	for (const key in item) {
		result.append(key, item[key])
	}
	return result
}

const Admin = {
	createProduct: (product: any) => requests.postForm("products", createFormData(product)),
	updateProduct: (product: any) => requests.putForm("products", createFormData(product)),
	deleteProduct: (id: number) => requests.delete("products/" + id)
}

const Agent = {
	Catalog,
	Basket,	
    TestErrors,
	Account,
	Orders,
	Payment,
	Admin
}
export default Agent