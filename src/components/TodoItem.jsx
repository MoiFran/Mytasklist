import React from 'react'

export function TodoItem({ todo, toggleTodo }) {

  const { id, task, completed } = todo;
  const handleTodoClick = () => {
    toggleTodo(id);
  }

  return (
    <h6>
      <input type="checkbox" onChange={handleTodoClick} checked={completed} />
      {task}
    </h6>
  )
}
