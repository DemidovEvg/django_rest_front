import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Pagination } from './pagination'
import { useLocation } from 'react-router-dom'
import { IProject } from '../hooks/projectHook';
import { Project } from './project'
import { IUser } from '../hooks/userHook';


interface ProjectsProps {
  projects: IProject[]
  deleteProject: (id: number) => void
  createProject: (title: string, users: number[]) => void
  users: IUser[]
}


export function Projects({ projects, deleteProject, createProject, users }: ProjectsProps) {
  const [page, setPage] = useState(0);

  const [projectsOnCurrentPage, setProjectsOnCurrentPage] = useState<IProject[]>([]);

  const queryParams = useLocation();


  useEffect(() => {
    const params = new URLSearchParams(queryParams.search)
    setPage(+(params.get('page') || 1))
  }, [queryParams,])

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Название</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projectsOnCurrentPage.map(
            (project, index) =>
              <Project project={project}
                number={index + 1}
                deleteProject={deleteProject}
                key={project.id} />
          )}
        </tbody>
      </Table>
      <Pagination items={projects}
        currentPage={page}
        pageSize={10}
        setItems={setProjectsOnCurrentPage} />
    </>
  )
}