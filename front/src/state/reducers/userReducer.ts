import type User from 'interfaces/user'
import { UserActionType } from 'state/action-types/userTypes'
import { type Action } from 'state/actions/userActions'

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
        default:
            return state
    }
}

export default reducer
