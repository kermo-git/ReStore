import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../App/Models/Product";

interface Props {
    product: Product
}

export default function ProductCard({product}: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "secondary.main"}}>
                        {product.name.charAt(0)}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {
                        fontWeight: "bold",
                        color: "primary.main"
                    }
                }}
            />
            <CardMedia
                image={product.pictureURL}
                title={product.name}
                sx={{
                    height: 140,
                    backgroundSize: "contain",
                    backgroundColor: "primary.light"
                }}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {(product.price / 100).toFixed(2)}€
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button component={Link} to={"/catalog/" + product.id} size="small">View</Button>
            </CardActions>
        </Card>
    )
}