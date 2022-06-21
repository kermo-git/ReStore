import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, UseControllerProps } from 'react-hook-form'

export default function AppDropzone(props: UseControllerProps) {
	const { fieldState, field } = useController({...props, defaultValue: null})
	
	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles[0]
		acceptedFiles[0] = Object.assign(file, {preview: URL.createObjectURL(file)})
		field.onChange(file)
	}, [field])

	const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ?
				<p>Drop the files here ...</p> :
				<p>Drag 'n' drop some files here, or click to select files</p>
			}
		</div>
	)
}