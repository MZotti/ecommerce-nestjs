export default interface ModalAction {
    label: string
    callback: (args1?: any) => void
    color?: string
}