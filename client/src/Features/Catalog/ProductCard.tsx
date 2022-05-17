import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import Agent from "../../App/API/Agent";
import { Product } from "../../App/Models/Product";
import { formatPrice } from "../../App/Utils";
import { useAppDispatch } from "../../App/Store/ConfigureStore";
import { setBasket } from "../Basket/BasketSlice";

interface Props {
    product: Product
}

export default function ProductCard({product}: Props) {
	const dispatch = useAppDispatch()
	const [loading, setLoading] = useState<boolean>(false)

	function addToCart() {
		setLoading(true)
		Agent.Basket.addItem(product.id)
			.then(basket => dispatch(setBasket(basket)))
			.catch(error => console.log(error))
			.finally(() => setLoading(false))
	}

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
                    {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
				<LoadingButton loading={loading} 
							   onClick={addToCart} 
							   size="small">
					Add to Cart
				</LoadingButton>
                <Button component={Link} to={"/catalog/" + product.id} size="small">View</Button>
            </CardActions>
        </Card>
    )
}