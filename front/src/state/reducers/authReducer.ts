import type Auth from 'interfaces/auth'
import { AuthActionType } from 'state/action-types/authTypes'
import { type Action } from 'state/actions/authActions'

const initialState: Auth = {
    token: '1234',
    user: {
        id: "1",
        name: "Marcos Zotti",
        email: "marcos@email.com"
    },
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
            console.log(action.payload)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default reducer
