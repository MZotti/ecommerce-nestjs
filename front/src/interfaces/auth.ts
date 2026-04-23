import User from './user'

export default interface Auth {
    token: string
    user: User | null
}
