import type Auth from 'interfaces/auth'
import { AuthActionType } from 'state/action-types/authTypes'
import { type Action } from 'state/actions/authActions'

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
        case AuthActionType.CREATE_ADDRESS:
            const currentAddresses = state.user?.addresses || [];
            
            return {
                ...state,
                user: {
                    ...state.user,
                    addresses: [...currentAddresses, action.payload]
                }
            }
        default:
            return state
    }
}

export default reducer
