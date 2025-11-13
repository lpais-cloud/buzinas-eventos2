
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { Screen, EventType } from '../types';

const CreateEventScreen: React.FC = () => {
    const { createEvent, currentUser } = useAppContext();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<EventType>(EventType.OUTRO);

    const handleSubmit = () => {
        if (!name || !date || !time || !location || !description || !currentUser) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        const eventDate = new Date(`${date}T${time}`).toISOString();
        createEvent({
            name,
            date: eventDate,
            location,
            description,
            type,
            organizerId: currentUser.id,
        });
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="Criar Novo Evento" backScreen={Screen.HOME} />
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome do Evento" className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg"/>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg"/>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg"/>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Local" className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg"/>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição do Evento" className="w-full h-32 p-4 text-xl border-2 border-gray-300 rounded-lg"/>
                <select value={type} onChange={e => setType(e.target.value as EventType)} className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg bg-white">
                    {Object.values(EventType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <Button onClick={handleSubmit}>Salvar Evento</Button>
            </div>
        </div>
    );
};

export default CreateEventScreen;
   