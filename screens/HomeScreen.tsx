
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import { Event, Screen } from '../types';

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
    const { navigateTo, users } = useAppContext();
    const organizer = users.find(u => u.id === event.organizerId);

    const formattedDate = new Date(event.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div
            onClick={() => navigateTo(Screen.EVENT_DETAIL, { eventId: event.id })}
            className="bg-surface rounded-lg shadow-md overflow-hidden mb-6 active:scale-95 transition-transform duration-200 cursor-pointer"
        >
            <img src={`https://picsum.photos/seed/${event.id}/400/200`} alt={event.name} className="w-full h-40 object-cover" />
            <div className="p-5">
                <span className="text-accent text-md font-bold">{event.type}</span>
                <h2 className="text-2xl font-bold text-textPrimary mt-1">{event.name}</h2>
                <p className="text-lg text-textSecondary mt-2">{formattedDate}</p>
                <p className="text-lg text-textSecondary">{event.location}</p>
                <div className="flex items-center justify-between mt-4">
                     <div className="flex items-center text-lg text-textSecondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-secondary" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        <span>{event.participants.length} confirmados</span>
                    </div>
                    {organizer && (
                         <div className="flex items-center">
                            <img src={organizer.avatarUrl} alt={organizer.name} className="w-8 h-8 rounded-full mr-2" />
                            <span className="text-md text-textSecondary font-semibold">{organizer.name}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const HomeScreen: React.FC = () => {
    const { events, currentUser } = useAppContext();

    return (
        <div className="flex flex-col h-full">
            <Header title={`Olá, ${currentUser?.name.split(' ')[0]}!`} />
            <div className="p-6 overflow-y-auto">
                <h2 className="text-3xl font-bold text-textPrimary mb-6">Próximos Eventos</h2>
                {events.filter(e => !e.isFinished).length > 0 ? (
                    events.filter(e => !e.isFinished).map(event => <EventCard key={event.id} event={event} />)
                ) : (
                    <p className="text-xl text-textSecondary text-center mt-10">Nenhum evento por aqui ainda.</p>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;
   