import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Screen } from '../types';

const NavItem: React.FC<{
  screen: Screen;
  label: string;
  // Fix: Changed JSX.Element to React.ReactNode to resolve namespace issue.
  icon: React.ReactNode;
}> = ({ screen, label, icon }) => {
  const { currentScreen, navigateTo, notifications, currentUser } = useAppContext();
  const isActive = currentScreen === screen;
  
  const unreadCount = screen === Screen.NOTIFICATIONS 
    ? notifications.filter(n => n.userId === currentUser?.id && !n.isRead).length 
    : 0;

  return (
    <button
      onClick={() => navigateTo(screen)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors duration-200 ${
        isActive ? 'text-primary' : 'text-textSecondary hover:text-primary'
      }`}
    >
      <div className="relative">
        {icon}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </div>
      <span className="mt-1 text-xs font-semibold">{label}</span>
    </button>
  );
};

const BottomNav: React.FC = () => {
  const { currentUser, navigateTo } = useAppContext();
  const isOrganizer = currentUser?.roles.includes('Organizador' as any);

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-surface border-t border-gray-200 shadow-lg">
      <div className="flex justify-around h-20">
        <NavItem
          screen={Screen.HOME}
          label="Eventos"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          }
        />
        <NavItem
          screen={Screen.TASKS}
          label="Tarefas"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
          }
        />
        {isOrganizer && (
            <div className="flex items-center justify-center">
                 <button onClick={() => navigateTo(Screen.CREATE_EVENT)} className="flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-lg -mt-6 hover:bg-blue-700 transition-transform transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                 </button>
            </div>
        )}
        <NavItem
          screen={Screen.NOTIFICATIONS}
          label="Avisos"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          }
        />
        <NavItem
          screen={Screen.PROFILE}
          label="Perfil"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          }
        />
      </div>
    </footer>
  );
};

export default BottomNav;
