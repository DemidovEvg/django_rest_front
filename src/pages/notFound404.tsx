import React from 'react';
import { useLocation } from 'react-router-dom'

export const NotFound404 = () => {
  let location = useLocation();

  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}
