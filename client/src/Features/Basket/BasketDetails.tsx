import { Grid } from '@mui/material';

import { BasketItem } from '../../App/Models/Basket';
import BasketSummary from './BasketSummary';
import BasketTable from './BasketTable';

interface Props {
	items: BasketItem[],
	canEdit: boolean
}

export default function BasketDetails({items, canEdit}: Props) {
	return (
		<>
			<BasketTable items={items} canEdit={canEdit}/>
			<Grid container>
				<Grid item xs={6}/>
				<Grid item xs={6}>
					<BasketSummary items={items}/>
				</Grid>
			</Grid>				
		</>
	);
}
