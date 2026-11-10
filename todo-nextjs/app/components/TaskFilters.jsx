'use client';

const filters = [
  { id: 'all', label: 'Todas' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'completed', label: 'Concluídas' }
];

export default function TaskFilters({ activeFilter, onChange }) {
  return (
    <div className="filters" role="group" aria-label="Filtrar tarefas">
      {filters.map((filter) => (
        <button
          key={filter.id}
          type="button"
          className={activeFilter === filter.id ? 'filter-button active' : 'filter-button'}
          onClick={() => onChange(filter.id)}
          aria-pressed={activeFilter === filter.id}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
