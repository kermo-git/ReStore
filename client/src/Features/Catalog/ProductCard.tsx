import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Product } from "../../App/Models/Product";

interface Props {
    product: Product
}

export default function ProductCard({product}: Props) {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.pictureURL}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {product.description}
            </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}