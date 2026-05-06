import { BasketIcon, MonitorIcon, UserIcon, UserListIcon } from "@phosphor-icons/react"

export interface MenuItem {
    id: string
    label: string
    link?: string
    icon?: React.ReactNode
    subItems: MenuItem[]
}

const menu: MenuItem[] = [
    {
        id: 'dashboards',
        label: 'Dashboards',
        icon: <MonitorIcon size="18px" />,
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
        ]
    },
    {
        id: 'administration',
        label: 'Administration',
        icon: <UserListIcon size="18px" />,
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