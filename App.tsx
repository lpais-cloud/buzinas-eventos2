
import React from 'react';
import { useAppContext } from './hooks/useAppContext';
import { Screen } from './types';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import BottomNav from './components/BottomNav';
import EventDetailScreen from './screens/EventDetailScreen';
import TasksScreen from './screens/TasksScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import ManageEventScreen from './screens/ManageEventScreen';
import EvaluationScreen from './screens/EvaluationScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const App: React.FC = () => {
  const { currentScreen, currentUser } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN:
        return <LoginScreen />;
      case Screen.REGISTER:
        return <RegisterScreen />;
      case Screen.FORGOT_PASSWORD:
        return <ForgotPasswordScreen />;
      case Screen.HOME:
        return <HomeScreen />;
      case Screen.EVENT_DETAIL:
        return <EventDetailScreen />;
      case Screen.TASKS:
        return <TasksScreen />;
      case Screen.PROFILE:
        return <ProfileScreen />;
      case Screen.NOTIFICATIONS:
        return <NotificationsScreen />;
      case Screen.CREATE_EVENT:
        return <CreateEventScreen />;
      case Screen.MANAGE_EVENT:
        return <ManageEventScreen />;
      case Screen.EVALUATION:
        return <EvaluationScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-background font-sans flex flex-col">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderScreen()}
      </main>
      {currentUser && <BottomNav />}
    </div>
  );
};

export default App;
   