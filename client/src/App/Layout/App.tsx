import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import AboutPage from "../../Features/About/AboutPage"
import Catalog from "../../Features/Catalog/Catalog"
import ProductDetailsPage from "../../Features/Catalog/ProductDetails"
import ContactPage from "../../Features/Contact/ContactPage"
import HomePage from "../../Features/Home/HomePage"
import Header from "./Header"
import ServerError from "../Errors/ServerError"
import NotFound from "../Errors/NotFound"
import BasketPage from "../../Features/Basket/BasketPage"
import Loading from "./Loading"
import CheckoutPage from "../../Features/Checkout/CheckoutPage"
import { useAppDispatch } from "../Store/ConfigureStore"
import { fetchBasketAsync } from "../../Features/Basket/BasketSlice"
import Login from "../../Features/Account/Login"
import Register from "../../Features/Account/Register"
import { fetchCurrentUser } from "../../Features/Account/AccountSlice"
import { PrivateRoute } from "./PrivateRoute"
import Orders from "../../Features/Orders/Orders"

function App() {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(false)

	const initApp = useCallback(async () => {
		try {
			await dispatch(fetchBasketAsync())
			await dispatch(fetchCurrentUser())
		} catch(error) {
			console.log(error);
		}
	}, [dispatch])

	useEffect(() => {
		initApp().then(() => setLoading(false))
	}, [initApp])
    
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            background: {
                default: darkMode ? "#121212" : "#EAEAEA"
            }
        }
    })
    
    function toggleDarkMode() {
        setDarkMode(!darkMode)
    }

	if (loading) return <Loading message="Initializing app ..."/>

    return (<>
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
            <CssBaseline/>
            <Header isDarkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/catalog" element={<Catalog/>}/>
                    <Route path="/catalog/:id" element={<ProductDetailsPage/>}/>
                    <Route path="/server-error" element={<ServerError/>}/>
					<Route path="/basket" element={<BasketPage/>}/>
					<Route 
						path="/checkout" 
						element={
							<PrivateRoute>
								<CheckoutPage/>
							</PrivateRoute>
						}
					/>						
					<Route 
						path="/orders" 
						element={
							<PrivateRoute>
								<Orders/>
							</PrivateRoute>
						}
					/>											
					<Route path="/login" element={<Login/>}/>
					<Route path="/register" element={<Register/>}/>							
					<Route path="/*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    </>)
}

export default App
