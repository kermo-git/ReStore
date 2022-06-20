import { Navigate, useLocation } from "react-router-dom"

import { useAppSelector } from "../Store/ConfigureStore"

export function PrivateRoute({ children }: { children: JSX.Element }) {
	const {user} = useAppSelector(state => state.account)
	const location = useLocation()

	if (!user) {
		return <Navigate to="/login" state={{from: location}} replace/>
	}
	return children
}