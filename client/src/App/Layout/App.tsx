import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../Features/About/AboutPage";
import Catalog from "../../Features/Catalog/Catalog";
import ProductDetailsPage from "../../Features/Catalog/ProductDetails";
import ContactPage from "../../Features/Contact/ContactPage";
import HomePage from "../../Features/Home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css"
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import BasketPage from "../../Features/Basket/BasketPage";
import { useStoreContext } from "../Context/StoreContext";
import { getCookie } from "../Utils";
import Agent from "../API/Agent";
import Loading from "./Loading";

function App() {
	const {setBasket} = useStoreContext()
	const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const buyerId = getCookie("buyerId")
		if (buyerId) {
			Agent.Basket.get()
			.then(basket => setBasket(basket))
			.catch(error => console.log(error))
			.finally(() => setLoading(false))
		}
	}, [setBasket])
    
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
					<Route path="/*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    </>)
}

export default App;
