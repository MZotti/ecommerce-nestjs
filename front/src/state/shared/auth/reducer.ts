import type Auth from "@/interfaces/auth"
import type { Action } from "./actions"
import { AuthActionType } from "./types"

const initialState: Auth = {
}

const reducer = (state: Auth = initialState, action: Action) => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return {
                token: action.payload.token,
                user: action.payload.user,
            }
        case AuthActionType.LOGOUT:
            return {
                token: '',
                user: null,
            }
        case AuthActionType.UPDATE_ME:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default reducer
