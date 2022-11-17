export const Api = {
  points: {
    users: '/api/userapp/user/',
    todos: '/api/projectapp/todo/',
    projects: '/api/projectapp/project/',
    token: '/api/token/',
    refreshToken: '/api/token/refresh/'
  },
  backendOrigin: 'http://localhost:8000',

  getUrlForUsers: function (): URL {
    return new URL(`${this.backendOrigin}${this.points.users}`)
  },

  getUrlForTodos: function (): URL {
    return new URL(`${this.backendOrigin}${this.points.todos}`)
  },

  getUrlForProjects: function (): URL {
    return new URL(`${this.backendOrigin}${this.points.projects}`)
  },

  getUrlForToken: function (): URL {
    return new URL(`${this.backendOrigin}${this.points.token}`)
  },

  getUrlForRefreshToken: function (): URL {
    return new URL(`${this.backendOrigin}${this.points.refreshToken}`)
  },
}