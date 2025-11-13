
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Button from '../components/Button';
import Header from '../components/Header';
import { Screen } from '../types';

const RegisterScreen: React.FC = () => {
    const { register, navigateTo } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [community, setCommunity] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (name && email && password && community && phone) {
            register({ name, email, phone, community });
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="Criar Conta" backScreen={Screen.LOGIN} />
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome Completo"
                    className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                 <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefone"
                    className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                 <input
                    type="text"
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    placeholder="Bairro/Comunidade"
                    className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                />
                <Button onClick={handleRegister}>Cadastrar</Button>
            </div>
        </div>
    );
};

export default RegisterScreen;
   