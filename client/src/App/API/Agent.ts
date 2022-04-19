import { history } from "../.."

import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"

const sleep = () => new Promise(resolve => setTimeout(resolve, 300))

axios.defaults.baseURL = "http://localhost:5000/api/"

axios.interceptors.response.use(
    async response => {
		await sleep();
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
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)  
}

const Catalog = {
    list: () => requests.get("products"),
    details: (id: string) => requests.get("products/" + id)
}

const TestErrors = {
    get400Error: () => requests.get("buggy/bad-request"),
    get401Error: () => requests.get("buggy/unauthorized"),
    get404Error: () => requests.get("buggy/not-found"),
    get500Error: () => requests.get("buggy/server-error"),
    getValidationError: () => requests.get("buggy/validation-error")
}
const Agent = {
    Catalog,
    TestErrors
}
export default Agent