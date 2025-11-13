
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import { Screen, TaskStatus, UserRole } from '../types';
import Button from '../components/Button';

const EventDetailScreen: React.FC = () => {
    const { screenParams, events, currentUser, users, navigateTo, confirmParticipation, cancelParticipation, addMessageToEvent, showToast } = useAppContext();
    const event = events.find(e => e.id === screenParams.eventId);
    const organizer = users.find(u => u.id === event?.organizerId);
    
    const [newMessage, setNewMessage] = useState('');

    if (!event || !currentUser) return <div className="p-6">Evento não encontrado.</div>;

    const isParticipant = event.participants.includes(currentUser.id);
    const isOrganizer = currentUser.id === event.organizerId;
    const isCollaboratorOnEvent = event.tasks.some(t => t.assigneeId === currentUser.id);

    const formattedDate = new Date(event.date).toLocaleString('pt-BR', {
        dateStyle: 'full',
        timeStyle: 'short',
    });

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            addMessageToEvent(event.id, {
                userId: currentUser.id,
                userName: currentUser.name,
                text: newMessage,
                timestamp: new Date().toISOString(),
            });
            setNewMessage('');
        }
    };
    
    const collaborators = users.filter(user => event.tasks.some(task => task.assigneeId === user.id));
    const uniqueCollaborators = Array.from(new Set(collaborators.map(c => c.id))).map(id => collaborators.find(c => c.id === id));


    return (
        <div className="flex flex-col h-full bg-background">
            <Header title={event.name} backScreen={Screen.HOME} />
            <div className="p-6 space-y-8 overflow-y-auto">
                <section>
                    <img src={`https://picsum.photos/seed/${event.id}/400/200`} alt={event.name} className="w-full h-48 object-cover rounded-lg shadow-lg mb-4" />
                    <p className="text-xl text-textSecondary font-semibold">{formattedDate}</p>
                    <p className="text-xl text-textSecondary mt-1">{event.location}</p>
                    <p className="text-lg text-textPrimary mt-4">{event.description}</p>
                </section>
                
                <section>
                    <h3 className="text-2xl font-bold text-textPrimary mb-4">Mural de Mensagens</h3>
                    <div className="space-y-4 max-h-60 overflow-y-auto bg-white p-4 rounded-lg border">
                         {event.messages.length > 0 ? event.messages.map(msg => (
                            <div key={msg.id} className="p-3 bg-gray-100 rounded-lg">
                                <p className="font-bold text-primary">{msg.userName}</p>
                                <p className="text-textPrimary">{msg.text}</p>
                            </div>
                        )) : <p className="text-textSecondary">Nenhuma mensagem ainda.</p>}
                    </div>
                     {isParticipant && (
                        <div className="mt-4 flex space-x-2">
                           <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Escreva uma mensagem..." className="flex-1 h-14 px-4 text-lg border-2 border-gray-300 rounded-lg"/>
                           <Button onClick={handleSendMessage} className="h-14 w-24">Enviar</Button>
                        </div>
                     )}
                </section>

                <section>
                    <h3 className="text-2xl font-bold text-textPrimary mb-4">Colaboradores</h3>
                     {uniqueCollaborators.length > 0 ? (
                        <div className="flex -space-x-4">
                            {uniqueCollaborators.map(user => user && <img key={user.id} src={user.avatarUrl} alt={user.name} title={user.name} className="w-12 h-12 rounded-full border-2 border-white"/>)}
                        </div>
                     ) : <p className="text-textSecondary text-lg">Nenhum colaborador com tarefas atribuídas.</p>}
                </section>
                
                 {(isCollaboratorOnEvent || isOrganizer) && (
                    <section>
                        <h3 className="text-2xl font-bold text-textPrimary mb-4">Minhas Tarefas</h3>
                        <div className="space-y-3">
                            {event.tasks.filter(t => t.assigneeId === currentUser.id).map(task => (
                                <div key={task.id} className="p-4 bg-white rounded-lg border">
                                    <p className="font-bold text-lg">{task.title}</p>
                                    <p className="text-md text-textSecondary">{task.status}</p>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => navigateTo(Screen.TASKS)} className="text-primary font-bold mt-4 text-lg">Ver todas as tarefas</button>
                    </section>
                )}


                <div className="pt-4">
                    {event.isFinished ? (
                         <Button onClick={() => navigateTo(Screen.EVALUATION, { eventId: event.id })} variant="secondary">Avaliar Evento</Button>
                    ) : isOrganizer ? (
                        <Button onClick={() => navigateTo(Screen.MANAGE_EVENT, { eventId: event.id })}>Gerenciar Evento</Button>
                    ) : isParticipant ? (
                        <Button onClick={() => cancelParticipation(event.id, currentUser.id)} variant="danger">Cancelar Participação</Button>
                    ) : (
                        <Button onClick={() => confirmParticipation(event.id, currentUser.id)}>Confirmar Participação</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetailScreen;
   