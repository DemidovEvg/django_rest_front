import React from 'react';
import { ITodo } from '../hooks/todoHook';


interface TodoProps {
  todo: ITodo
  number: number
}

export function Todo({ todo, number }: TodoProps) {
  return (
    <tr>
      <td>
        {todo.id}
      </td>
      <td>
        {`${todo.text.slice(0, 15)}...`}
      </td>
      <td>
        {todo.createdAt.toString()}
      </td>
      <td>
        {todo.updatedAt.toString()}
      </td>
      <td>
        {todo.authorId}
      </td>
      <td>
        {todo.isActive && 'Да'}
      </td>
    </tr>
  )
}