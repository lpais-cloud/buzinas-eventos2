
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../types';
import Button from '../components/Button';

const LoginScreen: React.FC = () => {
  const { login, navigateTo, users } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password not actually used in mock auth

  const handleLogin = () => {
    if (email) {
      login(email);
    }
  };

  const handleQuickLogin = (userEmail: string) => {
    login(userEmail);
  };


  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-surface">
      <h1 className="text-5xl font-bold text-primary mb-4">Buzinas</h1>
      <p className="text-xl text-textSecondary mb-12">Eventos do seu bairro.</p>

      <div className="w-full space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
          className="w-full h-16 px-4 text-xl border-2 border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <Button onClick={handleLogin}>Entrar</Button>
      </div>
      
      <div className="mt-8 text-center">
        <button onClick={() => navigateTo(Screen.FORGOT_PASSWORD)} className="text-lg text-primary hover:underline">Esqueceu a senha?</button>
        <p className="mt-2 text-lg text-textSecondary">
            Não tem uma conta? <button onClick={() => navigateTo(Screen.REGISTER)} className="font-bold text-primary hover:underline">Cadastre-se</button>
        </p>
      </div>

      <div className="mt-12 w-full">
        <h3 className="text-lg font-bold text-center text-textSecondary mb-4">Acesso Rápido (Protótipo)</h3>
        <div className="grid grid-cols-1 gap-3">
          {users.map(user => (
            <button key={user.id} onClick={() => handleQuickLogin(user.email)} className="w-full p-4 text-lg bg-gray-100 rounded-lg hover:bg-gray-200 text-left">
              <span className="font-bold">{user.name}</span>
              <span className="text-sm text-textSecondary block">{user.roles.join(', ')}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
   