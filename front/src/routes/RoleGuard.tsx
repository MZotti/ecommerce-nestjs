import type { State } from '@/state/reducers'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RoleGuard = ({ roles = [] }: { roles: String[] }) => {
    const { user } = useSelector(({ shared }: State) => shared.auth)

    console.log("User", user, roles, roles.includes(user?.role?.name));

    if (!user || !roles.includes(user.role.name))
        return <Navigate to="/backoffice" replace />;

    return (
        <Outlet />
    )
}

export default RoleGuard