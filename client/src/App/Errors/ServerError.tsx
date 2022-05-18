import { Button, Container, Divider, Paper, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"

export default function ServerError() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const data = state as any

    return (
        <Container component={Paper}>
            {data ? 
                <>
                    <Typography variant="h3" color="error" gutterBottom>{data.title}</Typography>
                    <Divider/>
                    <Typography>{data.detail}</Typography>
                    <Button onClick={() => navigate("/catalog")}>Go back to store</Button>
                </> 
            : <Typography>Server error</Typography>}
        </Container>
    )
}