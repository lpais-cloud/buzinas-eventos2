
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { Screen, Task, TaskStatus } from '../types';

const CreateTaskModal: React.FC<{ eventId: string, onClose: () => void }> = ({ eventId, onClose }) => {
    const { users, addTaskToEvent, events } = useAppContext();
    const event = events.find(e => e.id === eventId);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assigneeId, setAssigneeId] = useState<string | null>(null);
    const [dueDate, setDueDate] = useState('');
    
    const collaborators = users.filter(u => event?.participants.includes(u.id));

    const handleSubmit = () => {
        if (title && description && dueDate) {
            addTaskToEvent(eventId, {
                title,
                description,
                assigneeId,
                dueDate: new Date(dueDate).toISOString(),
                status: TaskStatus.PENDING,
            });
            onClose();
        } else {
            alert('Preencha todos os campos da tarefa.');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold">Criar Nova Tarefa</h2>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título da Tarefa" className="w-full h-14 px-4 text-lg border-2 rounded-lg"/>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" className="w-full h-24 p-4 text-lg border-2 rounded-lg"/>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full h-14 px-4 text-lg border-2 rounded-lg"/>
                <select value={assigneeId ?? ''} onChange={e => setAssigneeId(e.target.value || null)} className="w-full h-14 px-4 text-lg border-2 rounded-lg bg-white">
                    <option value="">Atribuir a...</option>
                    {collaborators.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
                <div className="flex space-x-4">
                    <Button onClick={onClose} variant="ghost" className="h-14">Cancelar</Button>
                    <Button onClick={handleSubmit} className="h-14">Salvar Tarefa</Button>
                </div>
            </div>
        </div>
    );
};


const ManageEventScreen: React.FC = () => {
    const { screenParams, events, users, showToast } = useAppContext();
    const event = events.find(e => e.id === screenParams.eventId);
    const [showTaskModal, setShowTaskModal] = useState(false);

    if (!event) return <div className="p-6">Evento não encontrado.</div>;
    
    const participants = users.filter(u => event.participants.includes(u.id));

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="Gerenciar Evento" backScreen={Screen.EVENT_DETAIL} />
            <div className="p-6 space-y-8 overflow-y-auto">
                <section>
                    <h3 className="text-2xl font-bold text-textPrimary mb-4">Participantes ({participants.length})</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {participants.map(user => (
                            <div key={user.id} className="flex items-center bg-white p-3 rounded-lg shadow">
                                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-3"/>
                                <span className="font-semibold text-lg truncate">{user.name}</span>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h3 className="text-2xl font-bold text-textPrimary mb-4">Tarefas</h3>
                    <div className="space-y-3">
                        {event.tasks.map(task => {
                            const assignee = users.find(u => u.id === task.assigneeId);
                            return (
                                <div key={task.id} className="bg-white p-4 rounded-lg shadow">
                                    <p className="font-bold text-lg">{task.title}</p>
                                    <p className="text-md text-textSecondary">
                                        {assignee ? `Atribuída a: ${assignee.name}` : 'Não atribuída'}
                                    </p>
                                    <p className={`font-bold text-md ${task.status === TaskStatus.COMPLETED ? 'text-secondary' : 'text-accent'}`}>{task.status}</p>
                                </div>
                            );
                        })}
                    </div>
                    <Button onClick={() => setShowTaskModal(true)} className="mt-4 h-14">Criar Nova Tarefa</Button>
                </section>
                <section>
                     <h3 className="text-2xl font-bold text-textPrimary mb-4">Ações do Evento</h3>
                     <div className="space-y-4">
                         <Button onClick={() => {navigator.clipboard.writeText(`https://buzinas.app/invite/${event.id}`); showToast('Link de convite copiado!')}} variant="secondary">Gerar Link de Convite</Button>
                         <Button onClick={() => showToast('Funcionalidade ainda não implementada')} variant="ghost">Editar Evento</Button>
                         <Button onClick={() => showToast('Funcionalidade ainda não implementada')} variant="danger">Excluir Evento</Button>
                     </div>
                </section>
            </div>
            {showTaskModal && <CreateTaskModal eventId={event.id} onClose={() => setShowTaskModal(false)} />}
        </div>
    );
};

export default ManageEventScreen;
   