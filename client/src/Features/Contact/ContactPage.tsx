import { Button, ButtonGroup, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../App/Store/ConfigureStore";
import { decrement, increment } from "./CounterSlice";

export default function ContactPage() {
	const dispatch = useAppDispatch()
	const {data, title} = useAppSelector(state => state.counter)
	
    return (<>
        <Typography variant="h2">
            {title}
        </Typography>		
		<Typography variant="h5">
            Data: {data}
        </Typography>
		<ButtonGroup>
			<Button 
				onClick={ev => {dispatch(decrement(1))}}
				variant="contained" 
				color="error">
				Decrement
			</Button>
			<Button 
				onClick={ev => {dispatch(increment(1))}}
				variant="contained" 
				color="primary">
				Increment
			</Button>
			<Button 
				onClick={ev => {dispatch(increment(5))}}
				variant="contained" 
				color="secondary">
				Increment by 5
			</Button>			
		</ButtonGroup>
	</>)
}