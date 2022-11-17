import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Api } from '../api'
import { urls } from "../App"
import { fetchData } from './fetchData'
import { IUserHandler } from "./tokenHook"

export interface IProject {
  id: number
  url: string
  title: string
  urlRepo: string
  users: number[]
}

interface ProjectProps {
  UserHandler: IUserHandler
}



export function ProjectHook({ UserHandler }: ProjectProps) {
  const [projects, setProjects] = useState<IProject[]>([])
  const navigate = useNavigate()

  function deleteProject(id: number) {
    if (!UserHandler.refresh) {
      return []
    }
    let firstAttempt = true
    const headers = UserHandler.getHeaders()

    function inner(headers: any) {
      axios.delete(`${Api.getUrlForProjects().href}${id}/`, { headers: headers })
        .then(response => {
          const newProjects = projects.filter((item) => item.id !== id)
          setProjects(newProjects)
          navigate(urls.projectList)
        }).catch(error => {
          console.log(error)
          if (firstAttempt && error?.response?.status === 401 && UserHandler) {
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

  function createProject(title: string, users: number[]) {
    if (!UserHandler.refresh) {
      return []
    }
    let firstAttempt = true
    const headers = UserHandler.getHeaders()

    function inner(headers: any) {
      const data = { title: title, users: users }
      axios.post<IProject>(`${Api.getUrlForProjects().href}`, data, { headers: headers })
        .then(response => {
          const newProject = response.data
          setProjects([...projects, newProject])
        }).catch(error => {
          console.log(error)
          if (firstAttempt && error?.response?.status === 401 && UserHandler) {
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
    let promiseUsers: Promise<IProject[]>
    promiseUsers = fetchData<IProject>(
      {
        url: Api.getUrlForProjects(),
        UserHandler: UserHandler
      }
    )
    promiseUsers.then((items: IProject[]) => {
      setProjects(items)
    })
  }, [UserHandler.access]) // eslint-disable-line



  return { projects, setProjects, deleteProject, createProject }
}
