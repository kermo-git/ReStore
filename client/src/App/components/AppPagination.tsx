import { useState } from "react";

import { Box, Pagination, Typography } from "@mui/material";

import { MetaData } from "../Models/Pagination";

interface Props {
	metaData: MetaData,
	onPageChange: (page: number) => void
}

export default function AppPagination({metaData, onPageChange}: Props) {
	const {currentPage, totalPages, pageSize, totalCount} = metaData
	const [pageNumberCache, setPageNumberCache] = useState(currentPage)

	const firstItemIndex = (currentPage - 1) * pageSize + 1
	const lastItemIndex = Math.min(currentPage * pageSize, totalCount)

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center">
			<Typography>
				Displaying items {firstItemIndex}-{lastItemIndex} out of {totalCount}
			</Typography>
			<Pagination
				color="secondary"
				size="large"
				count={totalPages}
				page={pageNumberCache}
				onChange={(_, page) => {
					setPageNumberCache(page)
					onPageChange(page)
				}}
			/>
		</Box>
	)
}