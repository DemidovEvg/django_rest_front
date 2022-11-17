import { useParams } from "react-router-dom";
import { IUser } from "../hooks/userHook";
import { NotFound404 } from "./notFound404";

interface UserProps {
  users: IUser[]
}

export function UserPage({ users }: UserProps) {
  const params = useParams();
  const userId = Number(params.userId)

  const user = users.find(user_ => user_.id === userId)

  if (!user) return (<NotFound404 />)
  console.log(user)
  return (
    <div className="container">
      <h1>Работник {user.username}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Имя</th>
            <td>{user.firstname || '-'}</td>
          </tr>
          <tr>
            <th scope="row">Фамилия</th>
            <td>{user.firstname || '-'}</td>
          </tr>
          <tr>
            <th scope="row">Почта</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th scope="row">Активность</th>
            <td>{user.isActive ? 'Да' : 'Нет'}</td>
          </tr>
          <tr>
            <th scope="row">Менеджер</th>
            <td>{user.isStaff ? 'Да' : 'Нет'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}