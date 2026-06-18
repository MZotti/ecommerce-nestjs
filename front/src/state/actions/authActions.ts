import type Address from '@/interfaces/address'
import type PaymentCard from '@/interfaces/paymentCard'
import type Auth from 'interfaces/auth'
import type User from 'interfaces/user'
import { AuthActionType } from 'state/action-types/authTypes'

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

interface AuthCreateAddressAction {
    type: AuthActionType.CREATE_ADDRESS,
    payload: Address
}

interface AuthCreatePaymentCardAction {
    type: AuthActionType.CREATE_PAYMENT_CARD,
    payload: PaymentCard
}

export type Action = AuthLoginAction | AuthLogoutAction | AuthUpdateMeAction | AuthCreateAddressAction | AuthCreatePaymentCardAction
