import type Auth from "@/interfaces/auth";
import type User from "@/interfaces/user";
import { me } from "@/services/auth";

const ACCESS_TOKEN = "access_token"

const storeAccessToken = (accessToken: string) => {
    window.localStorage.setItem(ACCESS_TOKEN, accessToken)
}

const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN);
}

const userIsLogged = async (): Promise<boolean> => {
    try {
        await me();

        return true;
    } catch (error) {
        return false;
    }
}

const isBackofficeUser = (user: User | null | undefined): boolean => {
    if (!user)
        return false;

    return ['ADMIN', 'MANAGER', 'OPERATIONAL', 'ANALYST'].includes(user?.role.name || "")
}

const isStoreUser = (user: User | null | undefined): boolean => {
    if (!user)
        return false;

    return ['CUSTOMER'].includes(user?.role.name || "")
}

const hasRole = (roles: string[], userRole: string): boolean => roles.includes(userRole)

export {
    storeAccessToken,
    getAccessToken,
    userIsLogged,
    isBackofficeUser,
    isStoreUser,
    hasRole
}