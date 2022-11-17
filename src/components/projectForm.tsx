import React, { useEffect, useState } from 'react';
import { IUser } from '../hooks/userHook';

interface ProjectFormProps {
  createProject: (title: string, users: number[]) => void
  users: IUser[]
}

export function ProjectForm({ createProject, users }: ProjectFormProps) {
  const [formTitle, setformTitle] = useState('')
  const [formUsers, setformUsers] = useState<number[]>([0])

  function handleChangeInput(setter: (arg: any) => void, event: React.ChangeEvent<HTMLInputElement>) {
    setter(event.target.value)
  }

  function handleChangeSelect(setter: (arg: any) => void, index: number, event: React.ChangeEvent<HTMLSelectElement>) {
    let newFormUsers = [...formUsers]
    newFormUsers[index] = +event.target.value
    if (!newFormUsers.includes(0)) {
      newFormUsers.push(0)
    }
    setter(newFormUsers)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    formUsers.pop()
    createProject(formTitle, formUsers)
  }

  useEffect(() => {
  }, [formUsers])

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="title">Название проекта</label>
        <input type="text"
          className="form-control"
          name="title"
          value={formTitle}
          onChange={(event) => handleChangeInput(setformTitle, event)} />
        <label htmlFor="users">Прикрепленные работники</label>
        {formUsers}
        {
          Object.entries(formUsers).map((value, index) => {
            let currentUserIndex = value[0]
            let currentUserId = value[1]
            console.log(currentUserId)
            return (
              <select id={currentUserIndex}
                key={currentUserIndex}
                className="form-select my-2"
                name={currentUserIndex}
                onChange={(event) => handleChangeSelect(setformUsers, index, event)}
                value={currentUserId}>
                <option> --- </option>
                {
                  users.map(user => {
                    return (<option value={user.id} key={user.id}>
                      {user.username}
                    </option>)
                  })
                }
              </select>)
          })
        }
      </div>
      <input type="submit" className="btn btn-primary my-2" value="Создать" />
    </form >
  )
}