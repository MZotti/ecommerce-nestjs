export default interface TableColumn {
    label: string
    acessor: string
    customCell?: (args1: string) => React.ReactNode
}
