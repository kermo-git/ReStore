import { Navigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"

import { useAppSelector } from "../Store/ConfigureStore"

interface Props {
	children: JSX.Element
	roles?: string[]
}

export function PrivateRoute({ children, roles }: Props) {
	const {user} = useAppSelector(state => state.account)
	const location = useLocation()

	if (!user) {
		return <Navigate to="/login" state={{from: location}} replace/>
	}
	if (roles && !roles.some(role => user.roles?.includes(role))) {
		toast.error("Not authorized to access this area")
		return <Navigate to="/catalog" state={{from: location}} replace/>
	}
	return children
}