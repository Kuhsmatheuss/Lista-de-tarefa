'use client';

import { useEffect, useMemo, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import TaskFilters from './components/TaskFilters';

const STORAGE_KEY = 'organizae-tasks-v1';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error('Não foi possível carregar as tarefas:', error);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, ready]);

  function addTask(title) {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const filteredTasks = useMemo(() => {
    if (filter === 'pending') return tasks.filter((task) => !task.completed);
    if (filter === 'completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className="app-card">
        <header className="header">
          <div className="brand-mark" aria-hidden="true">✓</div>
          <div>
            <p className="eyebrow">SEU DIA, MAIS LEVE</p>
            <h1>Organiza<span>ê.</span></h1>
            <p className="subtitle">Um passo de cada vez. Organize suas tarefas.</p>
          </div>
        </header>

        <TaskForm onAddTask={addTask} />

        <section className="summary" aria-label="Resumo das tarefas">
          <div className="summary-top">
            <div>
              <p className="summary-label">Seu progresso</p>
              <p className="summary-number">{completedCount} <span>de {tasks.length} concluídas</span></p>
            </div>
            <strong className="progress-percent">{progress}%</strong>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" aria-label="Progresso das tarefas">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mini-stats">
            <span><i className="dot dot-pending" /> {pendingCount} pendentes</span>
            <span><i className="dot dot-done" /> {completedCount} concluídas</span>
          </div>
        </section>

        <div className="list-heading">
          <div>
            <p className="eyebrow">PLANEJAMENTO</p>
            <h2>Minhas tarefas</h2>
          </div>
          <span className="task-total">{tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}</span>
        </div>

        <TaskFilters activeFilter={filter} onChange={setFilter} />

        <section className="task-list" aria-live="polite">
          {!ready ? null : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h3>{tasks.length === 0 ? 'Tudo começa por aqui' : 'Nenhuma tarefa encontrada'}</h3>
              <p>{tasks.length === 0 ? 'Adicione sua primeira tarefa e comece a organizar seu dia.' : 'Tente selecionar outro filtro para ver suas tarefas.'}</p>
            </div>
          )}
        </section>

        <footer className="footer"><span>Feito para deixar sua rotina mais simples.</span><span className="footer-heart">♥</span></footer>
      </section>
      <p className="page-note">ORGANIZE • REALIZE • RECOMECE</p>
    </main>
  );
}
