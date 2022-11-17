import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { Api } from '../api'


interface ITokenResponse {
    access: string;
    refresh: string
}

interface IRefreshTokenResponse {
    access: string;
}

export interface IUserHandler {
    setAccessToken: (arg0: string) => void,
    setRefreshToken: (arg0: string) => void,
    logout: () => void,
    refreshAccessToken: () => Promise<any>,
    access: string,
    refresh: string,
    handleSubmit: (
        event: React.FormEvent,
        login: string,
        password: string) => void,
    isAuthenticated: boolean,
    getHeaders: () => any
}

function getCookie(name: string) {
    let value = new Cookies().get(name)
    if (value !== 'undefined') {
        return value
    } else {
        return undefined
    }

}

export function TokenHook() {
    const [access, setAccessToken] = useState(() => getCookie('access'))
    const [refresh, setRefreshToken] = useState(() => getCookie('refresh'))
    const [isAuthenticated, setAuthenticated] = useState(false)

    async function getToken(
        login: string,
        password: string
    ) {
        const loginData = {
            "username": login,
            "password": password
        }

        try {
            const response = await axios.post<ITokenResponse>(
                Api.getUrlForToken().href,
                loginData
            )
            const data = response.data
            return data
        } catch (error) {
            console.log(error)
        }
    }

    function saveTokenInCookies(_access: string, _refresh: string) {
        const cookies = new Cookies()
        cookies.set('access', _access, { path: '/', maxAge: 5 })
        cookies.set('refresh', _refresh, { path: '/' })
    }

    async function refreshAccessToken(): Promise<any> {
        const refreshData = {
            "refresh": refresh
        }
        try {
            const response = await axios.post<IRefreshTokenResponse>(
                Api.getUrlForRefreshToken().href,
                refreshData
            )
            const data = response.data
            saveTokenInCookies(data.access, refresh)

            setAccessToken(data.access)
            return data.access

        } catch (error) {
            logout()
        }
    }

    async function handleSubmit(
        event: React.FormEvent,
        login: string,
        password: string
    ) {
        event.preventDefault()
        // Здесь отправляем запрос на сервер для получение токена
        // Далее сохраняем токен в localStorage
        const data = await getToken(login, password)
        if (data?.access) {
            setAccessToken(data.access)
            setRefreshToken(data.refresh)
            saveTokenInCookies(data.access, data.refresh)
        }
    }

    function logout() {
        setAccessToken('')
        setRefreshToken('')
    }

    function getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': ''
        }
        if (access) {
            headers['Authorization'] = `Bearer ${access}`
        }
        return headers
    }

    const UserHandler: IUserHandler = {
        setAccessToken: setAccessToken,
        setRefreshToken: setRefreshToken,
        logout: logout,
        refreshAccessToken: refreshAccessToken,
        access: access,
        refresh: refresh,
        handleSubmit: handleSubmit,
        isAuthenticated: isAuthenticated,
        getHeaders: getHeaders
    }
    useEffect(() => {
        if (access) {
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }, [access]) // eslint-disable-line

    // useEffect(() => {
    //     if (access) {
    //         setAuthenticated(true)
    //         saveTokenInCookies(access, refresh)
    //     } else {
    //         setAuthenticated(false)
    //     }

    // }, [access, refresh]) // eslint-disable-line

    return { UserHandler }
}