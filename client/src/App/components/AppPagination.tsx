import { Box, Pagination, Typography } from "@mui/material";

import { MetaData } from "../Models/Pagination";

interface Props {
	metaData: MetaData,
	onPageChange: (page: number) => void
}

export default function AppPagination({metaData, onPageChange}: Props) {
	const {currentPage, totalPages, pageSize, totalCount} = metaData

	const firstItemIndex = (currentPage - 1) * pageSize + 1
	const lastItemIndex = Math.min(firstItemIndex + pageSize - 1, totalCount)

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Typography>
				Displaying items {firstItemIndex}-{lastItemIndex} out of {totalCount}
			</Typography>
			<Pagination
				color="secondary"
				size="large"
				count={totalPages}
				page={currentPage}
				onChange={(_, page) => {
					onPageChange(page)
				}}
			/>
		</Box>
	)
}