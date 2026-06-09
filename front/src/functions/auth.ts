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

export {
    storeAccessToken,
    getAccessToken,
    userIsLogged
}