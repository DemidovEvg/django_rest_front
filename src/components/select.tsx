import React, { useState } from 'react';

interface SelectProps {
  items: any[]
  changeValues: (arg: any) => void
}

export function Select({ items, changeValues }: SelectProps) {
  const [value, setValue] = useState('')

  function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value)
    console.log(event.target.value)
  }

  return (
    <>
      <label>Прикрепленные работники</label>
      <select className="form-select" name="users" onChange={(event) => handleChangeSelect(event)}>
        {
          items.map(item => {
            return <option value={item.id} key={item.id}>{item.id}</option>
          })
        }
      </select>
    </>

  )
}