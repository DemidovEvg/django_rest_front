import React from 'react';
import { IUser } from '../hooks/userHook';



interface UserProps {
  user: IUser
  number: number
}

export function User({ user, number }: UserProps) {
  return (
    <tr>
      <td>
        {user.id}
      </td>
      <td>
        {user.username}
      </td>
      <td>
        {user.firstname}
      </td>
      <td>
        {user.lastname}
      </td>
      <td>
        {user.isActive ? 'Да' : 'Нет'}
      </td>
      <td>
        {user.isStaff ? 'Да' : 'Нет'}
      </td>
      <td>
        {user.email}
      </td>
    </tr>
  )
}