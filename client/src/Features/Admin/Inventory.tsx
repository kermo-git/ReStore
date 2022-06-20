import { useState } from "react";

import { Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

import { formatPrice } from "../../App/Utils";
import { useProducts } from "../../App/Hooks/UseProducts";
import { useAppDispatch } from "../../App/Store/ConfigureStore";
import AppPagination from "../../App/components/AppPagination";
import { setMetaData } from "../Catalog/CatalogSlice";
import ProductForm from "./ProductForm";
import { Product } from "../../App/Models/Product";

export default function Inventory() {
	const {products, metaData} = useProducts()
	const dispatch = useAppDispatch()

	function onPageChange(page: number) {
		dispatch(setMetaData({...metaData, currentPage: page}))
	}

	const [editMode, setEditMode] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)

	function editProduct(product: Product) {
		setSelectedProduct(product)
		setEditMode(true)
	}
	function cancelEdit() {
		if (selectedProduct)
			setSelectedProduct(undefined)
		setEditMode(false)
	}
	
	if (editMode) return <ProductForm product={selectedProduct} cancelEdit={cancelEdit}/>

	return (<>
		<Box display='flex' justifyContent='space-between'>
			<Typography sx={{ p: 2 }} variant='h4'>Inventory</Typography>
			<Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
		</Box>
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell align="left">Product</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="center">Type</TableCell>
						<TableCell align="center">Brand</TableCell>
						<TableCell align="center">Quantity</TableCell>
						<TableCell align="right"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.map((product) => (
						<TableRow
						key={product.id}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{product.id}
							</TableCell>
							<TableCell align="left">
								<Box display='flex' alignItems='center'>
									<img src={product.pictureURL} alt={product.name} style={{ height: 50, marginRight: 20 }} />
									<span>{product.name}</span>
								</Box>
							</TableCell>
							<TableCell align="right">{formatPrice(product.price)}</TableCell>
							<TableCell align="center">{product.type}</TableCell>
							<TableCell align="center">{product.brand}</TableCell>
							<TableCell align="center">{product.quantityInStock}</TableCell>
							<TableCell align="right">
								<Button onClick={() => editProduct(product)}startIcon={<Edit />} />
								<Button startIcon={<Delete />} color='error' />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
		{metaData && (
			<Box sx={{pt: 2, pb: 2}}>
				<AppPagination
					metaData={metaData}
					onPageChange={onPageChange}
				/>
			</Box>
		)}
	</>)
}