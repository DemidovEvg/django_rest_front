import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urls } from '../App';


interface TodoFormProps {
  createTodo: (title: string, project: number) => void
  currentProjectId: number
}

export function TodoForm({ createTodo, currentProjectId }: TodoFormProps) {
  const [text, setformText] = useState('')

  const navigate = useNavigate()

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setformText(event.target.value)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    // console.log(text)
    createTodo(text, currentProjectId)
    navigate(urls.projectDetail.replace(':projectId', `${currentProjectId}`))
  }


  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <div className="form-group">
        <label htmlFor="title">Текст</label>
        <input type="text"
          className="form-control"
          name="text"
          onChange={(event) => handleChangeInput(event)} />
      </div>
      <input type="submit" className="btn btn-primary my-2" value="Создать" />
    </form >
  )
}