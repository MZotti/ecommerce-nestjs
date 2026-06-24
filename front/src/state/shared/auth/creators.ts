import type Auth from "@/interfaces/auth"
import type { Dispatch } from "redux"
import type { Action } from "./actions"
import { AuthActionType } from "./types"
import type User from "@/interfaces/user"

export const loginAction = (auth: Auth) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.LOGIN,
            payload: auth,
        })
    }
}

export const updateMeAction = (user: User) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: AuthActionType.UPDATE_ME,
            payload: user,
        })
    }
}