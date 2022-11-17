import { useParams } from "react-router-dom";
import { ITodo } from "../hooks/todoHook";
import { IUser } from "../hooks/userHook";
import { NotFound404 } from "./notFound404";

interface TodoProps {
  todos: ITodo[]
  users: IUser[]
  deleteTodo: (id: number, projectId: number) => void
}

export function TodoPage({ todos, deleteTodo }: TodoProps) {
  const params = useParams();
  const projectId = Number(params.projectId)
  const todoId = Number(params.todoId)

  const todo = todos.find(todo_ => todo_.id === todoId)

  if (!todo) return (<NotFound404 />)
  return (
    <div className="container">
      <h1>Задача id={todo.id}</h1>
      <button type='button'
        className="btn btn-primary my-2"
        onClick={() => deleteTodo(todoId, projectId)}>
        Удалить задачу
      </button>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Текст</th>
            <td>{todo.text || '-'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}