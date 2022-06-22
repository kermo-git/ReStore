import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material"

interface Props {
	options: {
		value: string
		label: string
	}[]

	selectedValue: string
	onChange: (ev: any) => void
}

export default function RadioButtonGroup({options, selectedValue, onChange}: Props) {
	return (
		<FormControl component="fieldset">
			<RadioGroup onChange={onChange} value={selectedValue}>
				{options.map(({value, label}) => (
					<FormControlLabel value={value} control={<Radio/>} label={label} key={value}/>								
				))}
			</RadioGroup>
		</FormControl>
	)
}