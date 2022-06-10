import { TextField } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";

interface Props extends UseControllerProps {
	label: string
}

export function AppTextInput(props: Props) {
	const {field, fieldState} = useController({...props, defaultValue: ""})

	return (
		<TextField
			{...props}
			{...field}
			fullWidth
			error={!!fieldState.error}
			helperText={fieldState.error?.message}
		/>
	)
}