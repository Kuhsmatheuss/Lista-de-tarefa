'use client';

import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;
    onAddTask(cleanTitle);
    setTitle('');
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">Digite uma nova tarefa</label>
      <span className="input-plus" aria-hidden="true">＋</span>
      <input
        id="new-task"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="O que você precisa fazer?"
        maxLength={100}
      />
      <button type="submit" disabled={!title.trim()}>Adicionar</button>
    </form>
  );
}
