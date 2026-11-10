'use client';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article className={`task-item ${task.completed ? 'is-completed' : ''}`}>
      <button
        className={`check-button ${task.completed ? 'checked' : ''}`}
        type="button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Marcar ${task.title} como pendente` : `Marcar ${task.title} como concluída`}
        aria-pressed={task.completed}
      >
        {task.completed ? '✓' : ''}
      </button>
      <span className="task-title">{task.title}</span>
      <span className="task-status">{task.completed ? 'Concluída' : 'Pendente'}</span>
      <button className="delete-button" type="button" onClick={() => onDelete(task.id)} aria-label={`Excluir tarefa ${task.title}`} title="Excluir tarefa">×</button>
    </article>
  );
}
