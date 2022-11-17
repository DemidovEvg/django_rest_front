import axios from "axios"
import { useEffect, useState } from "react"
import { Api } from '../api'
import { fetchData } from './fetchData'
import { IUserHandler } from "./tokenHook"

export interface IUser {
    id: number
    url: URL
    username: string
    firstname: string
    lastname: string
    isStaff: boolean
    isActive: boolean
    email: string
}

interface UserProps {
    UserHandler: IUserHandler
}

export function UserHook({ UserHandler }: UserProps) {
    const [users, setUsers] = useState<IUser[]>([])

    function deleteUser(id: number) {
        const headers = UserHandler.getHeaders()
        console.log(headers)
        axios.delete(`${Api.getUrlForUsers().href}${id}`, { headers: headers })
            .then(response => {
                const newProjects = users.filter((item) => item.id !== id)
                setUsers(newProjects)
            }).catch(error => console.log(error))
    }

    useEffect(() => {

        let promiseUsers: Promise<IUser[]>

        promiseUsers = fetchData<IUser>(
            {
                url: Api.getUrlForUsers(),
                UserHandler: UserHandler
            }
        )
        promiseUsers.then((items: IUser[]) => {
            setUsers(items)
        })
    }, [UserHandler.access]) // eslint-disable-line

    return { users, setUsers, deleteUser }
}