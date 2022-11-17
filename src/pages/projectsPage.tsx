import { useCallback, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import { urls } from '../App';
import { ProjectFilter } from '../components/projectFilter';
import { Projects } from '../components/projects';
import { IProject } from '../hooks/projectHook';
import { IUser } from '../hooks/userHook';


interface ProjectsProps {
  projects: IProject[]
  deleteProject: (id: number) => void
  createProject: (title: string, users: number[]) => void
  users: IUser[]
}

export function ProjectsPage({ projects, deleteProject, createProject, users }: ProjectsProps) {
  const [projectsFiltered, setProjectsFiltered] = useState<IProject[]>([])
  const [titleForFilter, setTitleForFilter] = useState('')

  function filterProjects() {
    console.log(titleForFilter)
    const result = projects.filter(project => {
      return project.title.toLowerCase().includes(titleForFilter.toLowerCase())
    })
    setProjectsFiltered(result)
  }

  const filterProjectsMemoizedCallback = useCallback(filterProjects,
    [titleForFilter, projects],
  );

  useEffect(() => {
    filterProjectsMemoizedCallback()
  }, [titleForFilter, filterProjectsMemoizedCallback])

  return (
    <div>
      <h1>Проекты</h1>
      <Link to={urls.projectCreate}
        className='btn btn-primary my-2'>
        Создать проект
      </Link>
      <hr />
      <ProjectFilter setTitleForFilter={setTitleForFilter} filterProjects={filterProjects} />
      <div>Результат:</div>
      <Projects projects={projectsFiltered}
        deleteProject={deleteProject}
        createProject={createProject}
        users={users}
      />
    </div>
  )
}