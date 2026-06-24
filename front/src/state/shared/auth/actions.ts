import type Auth from "@/interfaces/auth"
import type User from "@/interfaces/user"
import type { AuthActionType } from "./types"

interface AuthLoginAction {
    type: AuthActionType.LOGIN
    payload: Auth
}

interface AuthLogoutAction {
    type: AuthActionType.LOGOUT
    payload: null
}

interface AuthUpdateMeAction {
    type: AuthActionType.UPDATE_ME,
    payload: User
}

export type Action = AuthLoginAction | AuthLogoutAction | AuthUpdateMeAction
