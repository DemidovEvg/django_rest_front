import { useParams, Link } from "react-router-dom";
import { urls } from "../App";
import { IProject } from "../hooks/projectHook"
import { ITodo } from "../hooks/todoHook";
import { IUser } from "../hooks/userHook";
import { NotFound404 } from "./notFound404";

interface ProjectProps {
  projects: IProject[]
  users: IUser[]
  todos: ITodo[]
}

export function ProjectPage({ projects, users, todos }: ProjectProps) {
  const params = useParams();
  const projectId = Number(params.projectId)

  const project = projects.find(project_ => project_.id === projectId)

  if (!project) return (<NotFound404 />)

  const usersOnProject = users.filter(user => user.id && project.users.includes(user.id))
  const todosOnProject = todos.filter(todo => todo.projectId === projectId)

  function getUser(autorId: number, users: IUser[]) {
    const user = users.find(user_ => user_.id === autorId)
    return user

  }

  return (
    <div className="container">
      <h1>Проект {project.title}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Репозиторий</th>
            <td>{project.urlRepo || '-'}</td>
          </tr>
          <tr>
            <th scope="row">Работники на проекте</th>
            <td>
              <ul>
                {
                  usersOnProject.map(function (user) {
                    return (
                      <li key={user.id}>
                        <Link to={`/user/${user.id}`} >{user.username}</Link>
                      </li>
                    )
                  })

                }
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">Задачи</th>
            <td>
              <Link to={urls.todoCreate.replace(':projectId', `${projectId}`)}
                className='btn btn-primary my-2'>
                Создать задачу
              </Link>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">id заметки</th>
                    <th scope="col">текст</th>
                    <th scope="col">автор</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    todosOnProject.map(function (todo) {
                      return (
                        <tr key={todo.id}>
                          <td><Link
                            to={
                              urls.todoDetail
                                .replace(':projectId', projectId.toString())
                                .replace(':todoId', todo.id.toString())
                            } >
                            {todo.id}
                          </Link>
                          </td>
                          <td>{todo.text}</td>
                          <td>{getUser(todo.authorId, users)?.username}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

            </td>
          </tr>

        </tbody>
      </table>
    </div>



  )
}