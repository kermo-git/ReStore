import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, UseControllerProps } from 'react-hook-form'

import { FormControl, FormHelperText, Typography } from '@mui/material'
import { UploadFile } from '@mui/icons-material'

export default function AppDropzone(props: UseControllerProps) {
	const { fieldState, field } = useController({...props, defaultValue: null})
	
	const style = {
		display: "flex",
		alignItems: "center",
		border: "dashed 3px #eee",
		borderColor: "#eee",
		borderRadius: "5px",
		paddingTop: "30px",
		height: 200,
		width: 500
	}

	const activeStyle = {
		borderColor: "green"
	}

	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles[0]
		acceptedFiles[0] = Object.assign(file, {preview: URL.createObjectURL(file)})
		field.onChange(file)
	}, [field])

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	return (
		<div {...getRootProps()}>
			<FormControl style={isDragActive ? {...style, ...activeStyle} : style} error={!!fieldState.error}>
				<input {...getInputProps()}/>
				<UploadFile sx={{fontSize: "100px"}}/>
				<Typography variant="h4">Drop image here</Typography>
				<FormHelperText>{fieldState.error?.message}</FormHelperText>
			</FormControl>
		</div>
	)
}