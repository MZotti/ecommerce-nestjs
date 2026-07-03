import type { State } from '@/state/reducers'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RoleGuard = ({ roles = [] }: { roles: String[] }) => {
    const { user } = useSelector(({ shared }: State) => shared.auth)

    if (!user || !roles.includes(user.role.name))
        return <Navigate to="/backoffice" replace />;

    return (
        <Outlet />
    )
}

export default RoleGuard