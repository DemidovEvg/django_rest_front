
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoForm } from "../components/todoForm";
import { IProject } from "../hooks/projectHook";


interface TodoCreatePageProps {
  createTodo: (title: string, project: number) => void
  projects: IProject[]
}

export function TodoCreatePage({ createTodo, projects }: TodoCreatePageProps) {
  const params = useParams();
  const currentProjectId = Number(params.projectId)
  const [currentProjectTitle, setCurrentProjectTitle] = useState('')

  useEffect(() => {
    const currentProject = projects.find(project => project.id === currentProjectId)
    if (currentProject) {
      setCurrentProjectTitle(currentProject.title)
    }
  }, [projects, currentProjectId])


  return (
    <>
      <h1>
        {currentProjectTitle}
      </h1>
      <div className="container">
        <TodoForm createTodo={createTodo} currentProjectId={currentProjectId} />
      </div>
    </>
  )
}