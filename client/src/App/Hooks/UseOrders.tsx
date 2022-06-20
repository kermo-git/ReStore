import { useCallback, useEffect } from "react"

import { fetchOrdersAsync } from "../../Features/Orders/OrderSlice"
import { useAppDispatch, useAppSelector } from "../Store/ConfigureStore"

export function useOrders() {
	const dispatch = useAppDispatch()
	const {orders, status} = useAppSelector(state => state.order)

	const init = useCallback(async () => {
		if (orders === null) await dispatch(fetchOrdersAsync())
	}, [dispatch])
	useEffect(() => { init() }, [init])

	return {orders, status}
}