import React from 'react';
import { Link } from 'react-router-dom';
import { IProject } from '../hooks/projectHook';


interface ProjectProps {
  project: IProject
  number: number
  deleteProject: (id: number) => void
}

export function Project({ project, number, deleteProject }: ProjectProps) {
  
  return (
    <tr>
      <td>
        <Link to={`${project.id}`}>{project.id}</Link>
      </td>
      <td>
        {project.title}
      </td>
      <td>
        <button type='button' className="btn btn-primary" onClick={() => deleteProject(project.id)}>
          Удалить
        </button>
      </td>
    </tr>
  )
}