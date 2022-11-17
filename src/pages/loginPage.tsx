
import React, { useState } from "react";


interface LoginProps {
  handleSubmit: (
    event: React.FormEvent,
    login: string,
    password: string) => void;
}

export function LoginPage({ handleSubmit }: LoginProps) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="container">
      <div className="col-3 m-auto mt-4">
        <form onSubmit={(event) => handleSubmit(event, login, password)}>
          <div className="mb-3">
            <input type="text" className="form-control" name="login" placeholder="login"
              value={login} onChange={(event) => setLogin(event.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" name="password" placeholder="password"
              value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          <input type="submit" className="btn btn-primary w-100" value="Login" />
        </form>
      </div>
    </div>
  )
}