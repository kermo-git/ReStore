import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
	message?: string
}

export default function Loading({message = "Loading ..."}: Props) {
	return (
		<Backdrop open={true} invisible={true}>
			<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" height="100vh">
				<CircularProgress sx={{marginBottom: 4}} size={100} color="secondary"/>
				<Typography variant="h4">{message}</Typography>
			</Box>
		</Backdrop>
	)
}