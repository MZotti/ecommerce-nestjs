import type User from 'interfaces/user'
import type { Action } from './actions'
import { UserActionType } from './types'

const initialState: User[] = []

const reducer = (state: User[] = initialState, action: Action) => {
    switch (action.type) {
        case UserActionType.PAGINATE_USERS:
            return action.payload
        case UserActionType.CREATE_USER:
            return [action.payload, ...state]
        case UserActionType.UPDATE_USER:
            return state.map(user => {
                if (user.id === action.payload.id) {
                    user = action.payload
                }
                return user;
            })
        case UserActionType.ACTIVE_USER:
            return state.map(user => {
                if (user.id === action.payload) {
                    return {
                        ...user,
                        isActive: true
                    }
                }
                return user;
            })
        case UserActionType.INACTIVE_USER:
            return state.map(user => {
                if (user.id === action.payload) {
                    return {
                        ...user,
                        isActive: false
                    }
                }
                return user;
            })
        case UserActionType.DELETE_USER:
            return state.filter(user => user.id !== action.payload)
        default:
            return state
    }
}

export default reducer
