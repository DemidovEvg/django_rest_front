import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Pagination } from './pagination'
import { useLocation } from 'react-router-dom'
import { ITodo } from '../hooks/todoHook';
import { Todo } from './todo';


interface TodosProps {
  todos: ITodo[]
}


export function Todos({ todos }: TodosProps) {
  const [page, setPage] = useState(0);

  const [todosOnCurrentPage, setTodosOnCurrentPage] = useState<ITodo[]>([]);

  const queryParams = useLocation();

  console.log(todos)

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
            <th>text</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>autor</th>
            <th>is_active</th>
          </tr>
        </thead>
        <tbody>
          {todosOnCurrentPage.map(
            (todo, index) =>
              <Todo todo={todo} number={index + 1} key={todo.id} />
          )}
        </tbody>
      </Table>
      <Pagination items={todos} currentPage={page} pageSize={10} setItems={setTodosOnCurrentPage} />
    </>
  )
}