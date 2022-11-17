import { Route, Routes, Navigate } from 'react-router-dom'
import { UsersPage } from './pages/usersPage'
import { ProjectsPage } from './pages/projectsPage'

import 'bootstrap/dist/css/bootstrap.css';
import { MainPage } from './pages/mainPage';

import { NotFound404 } from './pages/notFound404';
import { ProjectPage } from './pages/projectPage';
import { ProjectHook } from './hooks/projectHook';
import { TodoHook } from './hooks/todoHook';
import { UserHook } from './hooks/userHook';
import { UserPage } from './pages/userPage';
import { TodoPage } from './pages/todoPage';
import { LoginPage } from './pages/loginPage';
import { TokenHook } from './hooks/tokenHook';
import Menu from './components/menu';
import { ProjectCreatePage } from './pages/projectCreatePage';
import { TodoCreatePage } from './pages/todoCreatePage';

export const urls = {
  main: "/",
  userList: "/user/",
  projectList: "/project/",
  projectCreate: "/project/create/",
  login: "/login/",
  userDetail: "/user/:userId/",
  projectDetail: "/project/:projectId/",
  todoDetail: "/project/:projectId/todo/:todoId/",
  todoCreate: "/project/:projectId/todo/create/",
}

export default function App() {
  const { UserHandler } = TokenHook()
  const { projects, deleteProject, createProject } = ProjectHook({ UserHandler })
  const { todos, deleteTodo, createTodo } = TodoHook({ UserHandler })
  const { users } = UserHook({ UserHandler })


  return (
    <>
      <div className="wrapper d-flex flex-column h-100">
        <Menu isAuthenticated={UserHandler.isAuthenticated} logout={UserHandler.logout} />
        <div className="container" style={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path={urls.userList}
              element={<UsersPage users={users} />}
            />
            <Route path={urls.userDetail}
              element={
                UserHandler.isAuthenticated
                  ? <UserPage users={users} />
                  : <LoginPage handleSubmit={UserHandler.handleSubmit} />
              }
            />
            <Route path={urls.projectList}
              element={<ProjectsPage
                projects={projects}
                deleteProject={deleteProject}
                createProject={createProject}
                users={users} />}
            />
            <Route path={urls.projectDetail}
              element={<ProjectPage projects={projects}
                users={users}
                todos={todos} />}
            />
            <Route path={urls.todoDetail}
              element={
                UserHandler.isAuthenticated
                  ? <TodoPage users={users} todos={todos} deleteTodo={deleteTodo} />
                  : <LoginPage handleSubmit={UserHandler.handleSubmit} />
              }
            />
            <Route path={urls.login} element={
              UserHandler.isAuthenticated
                ? <Navigate replace to="/" />
                : <LoginPage handleSubmit={UserHandler.handleSubmit} />
            }
            />
            <Route path={urls.projectCreate}
              element={<ProjectCreatePage
                users={users}
                createProject={createProject} />} />

            <Route path={urls.todoCreate}
              element={<TodoCreatePage
                createTodo={createTodo}
                projects={projects} />} />
            {/* Редирект */}
            <Route path='/autors' element={<Navigate replace to='/user' />} />
            <Route path={urls.main} element={<MainPage />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </div>
        <footer style={{ flex: '0 0 auto' }}>
          <p className="text-center text-muted">© 2022 Company, Inc</p>
        </footer>
      </div>

    </>

  )
}