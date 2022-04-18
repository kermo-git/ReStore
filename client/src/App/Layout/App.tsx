import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
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

function App() {
    const [darkMode, setDarkMode] = useState(false)
    
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
                    <Route path="/server-error/" element={<ServerError/>}/>
                </Routes>
            </Container>
        </ThemeProvider>
    </>)
}

export default App;
