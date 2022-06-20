import { TextField } from "@mui/material"
import { useController, UseControllerProps } from "react-hook-form"

interface Props extends UseControllerProps {
	label: string
	rows?: number
	type?: string
}

export default function AppTextInput(props: Props) {
	const {field, fieldState} = useController({...props, defaultValue: ""})

	return (
		<TextField
			{...props}
			{...field}
			multiline={!!props.rows}
			fullWidth
			error={!!fieldState.error}
			helperText={fieldState.error?.message}
		/>
	)
}