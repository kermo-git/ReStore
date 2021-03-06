import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material"

import { formatPrice } from "../../App/Utils"
import { BasketItem } from "../../App/Models/Basket"

interface Props {
	items: BasketItem[]
}

export default function BasketSummary({items}: Props) {
    const subtotal = items.reduce((prevTotal, item) => (prevTotal + item.price * item.quantity), 0) ?? 0
    const deliveryFee = ((subtotal > 10000) || (subtotal === 0)) ? 0 : 500

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{formatPrice(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{formatPrice(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{formatPrice(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}