export default interface RowAction {
    label: string
    icon: React.ReactNode
    callback: (args1: number) => void,
    visible?: (args1: any) => boolean
}