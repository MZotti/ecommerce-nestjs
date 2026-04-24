export default interface TableColumn {
    label: string
    acessor: string
    customCell?: (args1: any) => React.ReactNode
}
