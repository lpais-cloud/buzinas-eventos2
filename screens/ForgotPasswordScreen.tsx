
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import Header from '../components/Header';
import { Screen } from '../types';

const ForgotPasswordScreen: React.FC = () => {
    const { navigateTo, showToast } = useAppContext();
    const [email, setEmail] = useState('');

    const handleRecovery = () => {
        if(email) {
            showToast(`Um link de recuperação foi enviado para ${email}`);
            navigateTo(Screen.LOGIN);
        } else {
            showToast('Por favor, insira seu e-mail.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="Recuperar Senha" backScreen={Screen.LOGIN} />
            <div className="p-6 space-y-6 flex-1 flex flex-col justify-center">
                <p className="text-lg text-textSecondary text-center mb-6">
                    Insira seu e-mail e enviaremos um link para você voltar a acessar sua conta.
                </p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu e-mail"
                    className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                <Button onClick={handleRecovery}>Enviar Link de Recuperação</Button>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
   