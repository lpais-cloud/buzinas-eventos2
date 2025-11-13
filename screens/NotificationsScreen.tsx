
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import { AppNotification } from '../types';

const NotificationItem: React.FC<{ notification: AppNotification }> = ({ notification }) => {
    const { navigateTo, markNotificationAsRead } = useAppContext();

    const handleClick = () => {
        markNotificationAsRead(notification.id);
        navigateTo(notification.link.screen, notification.link.params);
    };

    return (
        <div 
            onClick={handleClick}
            className={`p-5 mb-4 border-l-8 rounded-r-lg cursor-pointer transition-colors ${
                notification.isRead ? 'bg-surface border-gray-300' : 'bg-blue-50 border-primary'
            }`}
        >
            <p className={`text-lg ${notification.isRead ? 'text-textSecondary' : 'text-textPrimary font-semibold'}`}>
                {notification.text}
            </p>
            <p className="text-sm text-textSecondary mt-1">
                {new Date(notification.timestamp).toLocaleString('pt-BR')}
            </p>
        </div>
    );
};

const NotificationsScreen: React.FC = () => {
    const { notifications, currentUser } = useAppContext();
    const userNotifications = notifications
        .filter(n => n.userId === currentUser?.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="flex flex-col h-full">
            <Header title="Notificações" />
            <div className="p-6 overflow-y-auto flex-1">
                {userNotifications.length > 0 ? (
                    userNotifications.map(notif => <NotificationItem key={notif.id} notification={notif} />)
                ) : (
                    <p className="text-xl text-textSecondary text-center mt-10">Nenhuma notificação por aqui.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationsScreen;
   