import React, { useState } from 'react';


interface ProjectFilterProps {
  filterProjects: () => void
  setTitleForFilter: (title: string) => void
}

export function ProjectFilter({ filterProjects, setTitleForFilter }: ProjectFilterProps) {
  const [title, setformTitle] = useState('')

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setformTitle(event.target.value)
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault()
    setTitleForFilter(title)
  }

  return (
    <form onSubmit={(event) => handleSearch(event)}>
      <div>Поиск:</div>
      <label htmlFor="title" className="form-label"
      >Название проекта
      </label>
      <input type="search"
        className="form-control"
        id="title"
        value={title}
        onChange={(event) => handleChangeInput(event)} />
      <input type="submit" className="btn btn-primary my-2" value="Искать" />
    </form>
  )
}