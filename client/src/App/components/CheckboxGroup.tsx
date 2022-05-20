import { FormControlLabel, Checkbox, FormGroup } from "@mui/material";

interface Props {
	items: string[]
	checkedItems: string[]
	onChange: (checked: string[]) => void
}

export default function CheckboxGroup({items, checkedItems, onChange}: Props) {
	return (
		<FormGroup>
			{items.map(item => (
				<FormControlLabel 
					control={
						<Checkbox
							checked={checkedItems.includes(item)}
							onChange={(ev) => {
								let newChecked = [...checkedItems]
								
								if (ev.target.checked) {
									newChecked.push(item)
								} else {
									newChecked = newChecked.filter(
										checkedItem => checkedItem !== item
									)
								}
								onChange(newChecked)
							}}
						/>
					} 
					label={item} 
					key={item} 
				/>							
			))}
		</FormGroup>
	)
}