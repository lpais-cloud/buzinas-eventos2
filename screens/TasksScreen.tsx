
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import { Task, TaskStatus } from '../types';

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { events, updateTaskStatus } = useAppContext();
  const event = events.find(e => e.id === task.eventId);

  if (!event) return null;

  const statusColors = {
    [TaskStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 border-blue-300',
    [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
  };

  const nextStatus = {
      [TaskStatus.PENDING]: TaskStatus.IN_PROGRESS,
      [TaskStatus.IN_PROGRESS]: TaskStatus.COMPLETED,
      [TaskStatus.COMPLETED]: TaskStatus.PENDING, // Cycle back for demo purposes
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTaskStatus(task.id, task.eventId, newStatus);
  };

  return (
    <div className={`p-5 mb-4 bg-surface rounded-lg shadow-md border-l-8 ${statusColors[task.status]}`}>
      <p className="text-sm font-bold text-textSecondary">{event.name}</p>
      <h3 className="text-xl font-bold text-textPrimary mt-1">{task.title}</h3>
      <p className="text-lg text-textSecondary mt-2">{task.description}</p>
      <p className="text-md font-semibold mt-2">Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}</p>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.values(TaskStatus).map(status => (
            <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border-2 ${task.status === status ? `${statusColors[status]}` : 'bg-gray-200 text-gray-700'}`}
            >
                {status}
            </button>
        ))}
      </div>
    </div>
  );
};

const TasksScreen: React.FC = () => {
  const { events, currentUser } = useAppContext();
  const [filter, setFilter] = useState<TaskStatus | 'ALL'>('ALL');

  const myTasks = useMemo(() => {
    if (!currentUser) return [];
    const allTasks = events.flatMap(event => event.tasks.filter(task => task.assigneeId === currentUser.id));
    if (filter === 'ALL') return allTasks;
    return allTasks.filter(task => task.status === filter);
  }, [events, currentUser, filter]);

  const FilterButton: React.FC<{ status: TaskStatus | 'ALL', label: string }> = ({ status, label }) => (
    <button
        onClick={() => setFilter(status)}
        className={`px-6 py-3 text-lg font-bold rounded-full transition-colors ${filter === status ? 'bg-primary text-white' : 'bg-surface text-textSecondary'}`}
    >
        {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full">
      <Header title="Minhas Tarefas" />
      <div className="p-4 flex space-x-2 overflow-x-auto">
        <FilterButton status="ALL" label="Todas"/>
        <FilterButton status={TaskStatus.PENDING} label={TaskStatus.PENDING}/>
        <FilterButton status={TaskStatus.IN_PROGRESS} label={TaskStatus.IN_PROGRESS}/>
        <FilterButton status={TaskStatus.COMPLETED} label={TaskStatus.COMPLETED}/>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        {myTasks.length > 0 ? (
          myTasks.map(task => <TaskItem key={task.id} task={task} />)
        ) : (
          <p className="text-xl text-textSecondary text-center mt-10">Você não tem tarefas atribuídas.</p>
        )}
      </div>
    </div>
  );
};

export default TasksScreen;
   