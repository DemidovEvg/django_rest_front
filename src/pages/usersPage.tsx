import { Users } from '../components/users';
import { IUser } from '../hooks/userHook'

interface UserProps {
  users: IUser[]
}

export function UsersPage({ users }: UserProps) {
  return (
    <div>
      <h1>Работники</h1>
      <Users users={users} />
    </div>
  )
}