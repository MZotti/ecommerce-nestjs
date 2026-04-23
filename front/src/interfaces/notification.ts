export default interface Notification {
    id: string
    label: string
    created_at: Date
    read_at: Date | null
}
