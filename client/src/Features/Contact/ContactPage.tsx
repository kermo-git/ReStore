import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CounterState, decrement, increment } from "./CounterReducer";

export default function ContactPage() {
	const dispatch = useDispatch()
	const {data, title} = useSelector((state: CounterState) => state)
	
    return (<>
        <Typography variant="h2">
            {title}
        </Typography>		
		<Typography variant="h5">
            Data: {data}
        </Typography>
		<ButtonGroup>
			<Button 
				onClick={ev => {dispatch(decrement())}}
				variant="contained" 
				color="error">
				Decrement
			</Button>
			<Button 
				onClick={ev => {dispatch(increment())}}
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