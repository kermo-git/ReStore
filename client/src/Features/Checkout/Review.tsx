import Typography from '@mui/material/Typography';

import { useAppSelector } from '../../App/Store/ConfigureStore';
import BasketDetails from '../Basket/BasketDetails';

export default function Review() {
	const {basket} = useAppSelector(state => state.basket)
		
	return (
		<>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			{basket && <BasketDetails items={basket.items} canEdit={false}/>}			
		</>
	);
}