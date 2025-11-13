
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import Button from '../components/Button';
import { UserRole } from '../types';

const ProfileScreen: React.FC = () => {
    const { currentUser, logout, login, users, showToast } = useAppContext();

    if (!currentUser) return null;

    const handleSwitchUser = (email: string) => {
        login(email);
        showToast(`Perfil alterado para ${users.find(u => u.email === email)?.name}`);
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <Header title="Meu Perfil" />
            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                <div className="flex flex-col items-center space-y-4">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-40 h-40 rounded-full shadow-lg border-4 border-white" />
                    <h2 className="text-4xl font-bold text-textPrimary">{currentUser.name}</h2>
                    <div className="flex space-x-2">
                        {currentUser.roles.map(role => (
                            <span key={role} className="px-4 py-1 bg-secondary text-white text-md font-semibold rounded-full">{role}</span>
                        ))}
                    </div>
                </div>

                <div className="bg-surface p-6 rounded-lg shadow-md space-y-4">
                    <div className="text-lg">
                        <p className="font-semibold text-textSecondary">E-mail</p>
                        <p className="text-textPrimary text-xl">{currentUser.email}</p>
                    </div>
                    <div className="text-lg">
                        <p className="font-semibold text-textSecondary">Telefone</p>
                        <p className="text-textPrimary text-xl">{currentUser.phone}</p>
                    </div>
                    <div className="text-lg">
                        <p className="font-semibold text-textSecondary">Comunidade</p>
                        <p className="text-textPrimary text-xl">{currentUser.community}</p>
                    </div>
                </div>

                <Button onClick={() => showToast('Funcionalidade ainda não implementada.')} variant="ghost">Editar Perfil</Button>
                <Button onClick={logout} variant="danger">Sair</Button>
            </div>
            <div className="p-6 border-t">
                <h3 className="text-lg font-bold text-center text-textSecondary mb-4">Trocar de Usuário (Protótipo)</h3>
                <div className="grid grid-cols-1 gap-3">
                    {users.filter(u => u.id !== currentUser.id).map(user => (
                        <button key={user.id} onClick={() => handleSwitchUser(user.email)} className="w-full p-4 text-lg bg-gray-100 rounded-lg hover:bg-gray-200 text-left">
                            <span className="font-bold">{user.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
   