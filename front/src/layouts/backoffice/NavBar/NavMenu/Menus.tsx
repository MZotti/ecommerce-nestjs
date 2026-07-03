import { Role } from "@/enums/roles"
import { BasketIcon, ChartBarIcon, UserListIcon } from "@phosphor-icons/react"

export interface MenuItem {
    id: string
    label: string
    link?: string
    icon?: React.ReactNode
    roles?: string[]
    subItems: MenuItem[]
}

const menu: MenuItem[] = [
    {
        id: 'dashboards',
        label: 'Dashboards',
        icon: <ChartBarIcon size="18px" />,
        subItems: [
            {
                id: 'products',
                label: 'Products',
                link: 'dashboards/products',
                subItems: []
            },
            {
                id: 'orders',
                label: 'Orders',
                link: 'dashboards/orders',
                subItems: []
            },
        ]
    },
    {
        id: 'store',
        label: 'Store',
        icon: <BasketIcon size={18} />,
        subItems: [
            {
                id: 'products',
                label: 'Products',
                link: 'products',
                subItems: []
            },
            {
                id: 'orders',
                label: 'Orders',
                link: 'orders',
                subItems: []
            },
            {
                id: 'customers',
                label: 'Customers',
                link: 'customers',
                roles: [Role.ADMIN, Role.MANAGER],
                subItems: []
            },
        ]
    },
    {
        id: 'administration',
        label: 'Administration',
        icon: <UserListIcon size="18px" />,
        roles: [Role.ADMIN, Role.MANAGER],
        subItems: [
            {
                id: 'users',
                label: 'Users',
                link: 'users',
                subItems: []
            },
        ]
    }
]

export default menu