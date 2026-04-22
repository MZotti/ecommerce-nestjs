const ACCESS_TOKEN = "access_token"

const storeAccessToken = (accessToken: string) => {
    window.localStorage.setItem(ACCESS_TOKEN, accessToken)
}

const getAccessToken = () => {
    return window.localStorage.getItem(ACCESS_TOKEN);
}

export {
    storeAccessToken,
    getAccessToken
}