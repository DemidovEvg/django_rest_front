import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Api } from '../api'
import { urls } from "../App"
import { fetchData } from "./fetchData"
import { IUserHandler } from "./tokenHook"


export interface ITodo {
  id: number
  url: string
  projectId: number
  text: string
  createdAt: Date
  updatedAt: Date
  authorId: number
  isActive: boolean
}

interface TodoProps {
  UserHandler: IUserHandler
}

export function TodoHook({ UserHandler }: TodoProps) {
  const [todos, setTodos] = useState<ITodo[]>([])
  const navigate = useNavigate()

  function deleteTodo(todoId: number, projectId: number) {
    if (!UserHandler.refresh) {
      return []
    }
    let firstAttempt = true
    const headers = UserHandler.getHeaders()

    function inner(headers: any) {
      console.log('Старт удаления', firstAttempt)
      axios.delete(`${Api.getUrlForTodos().href}${todoId}/`, { headers: headers })
        .then(response => {
          console.log(response)
          const newTodos = todos.filter((item) => item.id !== todoId)
          setTodos(newTodos)
          navigate(urls.projectDetail.replace(':projectId', projectId.toString()))
        }).catch(error => {
          console.log(error)
          if (firstAttempt && error?.response?.status === 401) {
            firstAttempt = false
            // Необходимо попробовать обновить токен и запустить заново
            setTimeout(() => {
              const promise = UserHandler.refreshAccessToken()
              promise.then((access) => {
                headers['Authorization'] = `Bearer ${access}`
                inner(headers)
              })

            }, 0)
          }
        })
    }
    inner(headers)
  }

  function createTodo(text: string, project: number) {
    if (!UserHandler.refresh) {
      return []
    }
    let firstAttempt = true
    const headers = UserHandler.getHeaders()

    function inner(headers: any) {
      const data = { text: text, project: project }
      axios.post<ITodo>(`${Api.getUrlForTodos().href}`, data, { headers: headers })
        .then(response => {
          const newTodo = response.data
          setTodos([...todos, newTodo])
        }).catch(error => {
          console.log(error)
          if (firstAttempt && error?.response?.status === 401) {
            firstAttempt = false
            // Необходимо попробовать обновить токен и запустить заново
            setTimeout(() => {
              const promise = UserHandler.refreshAccessToken()
              promise.then((access) => {
                headers['Authorization'] = `Bearer ${access}`
                inner(headers)
              })

            }, 0)
          }
        })
    }
    inner(headers)
  }

  useEffect(() => {
    let promiseUsers: Promise<ITodo[]>
    promiseUsers = fetchData<ITodo>(
      {
        url: Api.getUrlForTodos(),
        UserHandler: UserHandler
      }
    )
    promiseUsers.then((items: ITodo[]) => {
      setTodos(items)
    })
  }, [UserHandler.access]) // eslint-disable-line

  return { todos, setTodos, deleteTodo, createTodo }
}