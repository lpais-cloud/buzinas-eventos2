
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { Screen } from '../types';

const StarRating: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    return (
        <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                    <svg
                        className={`w-14 h-14 transition-colors ${star <= rating ? 'text-accent' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </button>
            ))}
        </div>
    );
};


const EvaluationScreen: React.FC = () => {
    const { screenParams, currentUser, events, addEvaluationToEvent } = useAppContext();
    const event = events.find(e => e.id === screenParams.eventId);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');

    if (!event || !currentUser) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert('Por favor, selecione uma avaliação de estrelas.');
            return;
        }
        addEvaluationToEvent(event.id, {
            userId: currentUser.id, // Stored for integrity, but displayed as anonymous
            rating,
            comment,
            answers: {
                'O evento foi bem organizado?': q1,
                'Você participaria novamente?': q2,
            }
        });
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title={`Avaliar: ${event.name}`} backScreen={Screen.EVENT_DETAIL} />
            <div className="p-6 space-y-8 overflow-y-auto flex-1">
                <p className="text-center text-lg text-textSecondary">Sua avaliação é anônima e ajuda a melhorar os próximos eventos.</p>
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-center text-textPrimary">Qual sua nota para o evento?</h3>
                    <StarRating rating={rating} setRating={setRating} />
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-textPrimary">O evento foi bem organizado?</h3>
                    <div className="flex space-x-4">
                        <Button onClick={() => setQ1('Sim')} variant={q1 === 'Sim' ? 'primary' : 'ghost'} className="h-14">Sim</Button>
                        <Button onClick={() => setQ1('Não')} variant={q1 === 'Não' ? 'primary' : 'ghost'} className="h-14">Não</Button>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-textPrimary">Você participaria novamente?</h3>
                    <div className="flex space-x-4">
                        <Button onClick={() => setQ2('Sim')} variant={q2 === 'Sim' ? 'primary' : 'ghost'} className="h-14">Sim</Button>
                        <Button onClick={() => setQ2('Não')} variant={q2 === 'Não' ? 'primary' : 'ghost'} className="h-14">Não</Button>
                    </div>
                </div>
                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Deixe um comentário (opcional)"
                    className="w-full h-32 p-4 text-xl border-2 border-gray-300 rounded-lg"
                />
                <Button onClick={handleSubmit}>Enviar Avaliação</Button>
            </div>
        </div>
    );
};

export default EvaluationScreen;
   