import React, { useState, useEffect } from 'react';
import { IUser } from '../hooks/userHook';
import { User } from './user'
import Table from 'react-bootstrap/Table';
import { Pagination } from './pagination'
import { useLocation } from 'react-router-dom'


interface UsersProps {
  users: IUser[]
}


export function Users({ users }: UsersProps) {
  const [page, setPage] = useState(1);

  const [usersOnCurrentPage, setUsersOnCurrentPage] = useState<IUser[]>([]);

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
            <th>Username</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Активность</th>
            <th>Менеджер</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {usersOnCurrentPage.map(
            (user, index) =>
              <User user={user} number={index + 1} key={user.username} />
          )}
        </tbody>
      </Table>
      <Pagination items={users} currentPage={page} pageSize={10} setItems={setUsersOnCurrentPage} />
    </>
  )
}