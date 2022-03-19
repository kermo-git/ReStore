import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../App/Models/Product";

interface Props {
    products: Product[],
    addProduct: () => void
}

export default function Catalog({products, addProduct}: Props) {
    return (<>
        <List>
            {products.map((item, i) => (
                <ListItem key={item.id}>
                    <ListItemAvatar>
                        <Avatar src={item.pictureURL}/>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={item.price + "$"}/>
                </ListItem>
            ))}
        </List>
        <Button variant="contained" onClick={addProduct}>
            Add Product
        </Button>
    </>)
}