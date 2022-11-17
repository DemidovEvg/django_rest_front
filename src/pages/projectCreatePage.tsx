
import { ProjectForm } from "../components/projectForm";
import { IUser } from "../hooks/userHook";


interface ProjectCreatePageProps {
  createProject: (title: string, users: number[]) => void
  users: IUser[]
}

export function ProjectCreatePage({ createProject, users }: ProjectCreatePageProps) {
  return (
    <div className="container">
      <ProjectForm createProject={createProject} users={users} />
    </div>
  )
}