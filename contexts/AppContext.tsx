
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers, mockEvents, mockNotifications } from '../data/mock';
import { User, Event, AppNotification, Screen, Task, TaskStatus, Message, Evaluation } from '../types';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  events: Event[];
  notifications: AppNotification[];
  currentScreen: Screen;
  screenParams: any;
  login: (email: string) => boolean;
  logout: () => void;
  register: (user: Omit<User, 'id' | 'roles' | 'avatarUrl'>) => void;
  navigateTo: (screen: Screen, params?: any) => void;
  showToast: (message: string) => void;
  confirmParticipation: (eventId: string, userId: string) => void;
  cancelParticipation: (eventId: string, userId: string) => void;
  createEvent: (event: Omit<Event, 'id' | 'participants' | 'tasks' | 'messages' | 'evaluations' | 'isFinished'>) => void;
  updateTaskStatus: (taskId: string, eventId: string, status: TaskStatus) => void;
  addMessageToEvent: (eventId: string, message: Omit<Message, 'id'>) => void;
  addTaskToEvent: (eventId: string, task: Omit<Task, 'id' | 'eventId'>) => void;
  addEvaluationToEvent: (eventId: string, evaluation: Omit<Evaluation, 'id'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [users, setUsers] = useLocalStorage<User[]>('users', mockUsers);
  const [events, setEvents] = useLocalStorage<Event[]>('events', mockEvents);
  const [notifications, setNotifications] = useLocalStorage<AppNotification[]>('notifications', mockNotifications);
  
  const [currentScreen, setCurrentScreen] = useState<Screen>(currentUser ? Screen.HOME : Screen.LOGIN);
  const [screenParams, setScreenParams] = useState<any>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const login = (email: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      navigateTo(Screen.HOME);
      showToast(`Bem-vindo(a) de volta, ${user.name}!`);
      return true;
    }
    showToast('Usuário não encontrado.');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    navigateTo(Screen.LOGIN);
    showToast('Você saiu com sucesso.');
  };
  
  const register = (newUser: Omit<User, 'id' | 'roles' | 'avatarUrl'>) => {
    const user: User = {
        ...newUser,
        id: `user-${Date.now()}`,
        roles: [ 'Morador' as any ],
        avatarUrl: `https://picsum.photos/seed/${Date.now()}/200`
    };
    setUsers(prev => [...prev, user]);
    login(user.email);
  };

  const navigateTo = (screen: Screen, params: any = null) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const confirmParticipation = (eventId: string, userId: string) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId && !event.participants.includes(userId)) {
        return { ...event, participants: [...event.participants, userId] };
      }
      return event;
    }));
    showToast('Participação confirmada!');
  };

  const cancelParticipation = (eventId: string, userId: string) => {
     setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        return { ...event, participants: event.participants.filter(pId => pId !== userId) };
      }
      return event;
    }));
    showToast('Participação cancelada.');
  };
  
  const createEvent = (eventData: Omit<Event, 'id' | 'participants' | 'tasks' | 'messages' | 'evaluations' | 'isFinished'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event-${Date.now()}`,
      participants: [eventData.organizerId],
      tasks: [],
      messages: [],
      evaluations: [],
      isFinished: false,
    };
    setEvents(prev => [newEvent, ...prev]);
    showToast('Evento criado com sucesso!');
    navigateTo(Screen.HOME);
  };
  
  const updateTaskStatus = (taskId: string, eventId: string, status: TaskStatus) => {
    setEvents(prevEvents => prevEvents.map(event => {
        if (event.id === eventId) {
            const newTasks = event.tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, status };
                }
                return task;
            });
            return { ...event, tasks: newTasks };
        }
        return event;
    }));
    showToast(`Tarefa atualizada para: ${status}`);
  };

  const addMessageToEvent = (eventId: string, message: Omit<Message, 'id'>) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const newMessage: Message = { ...message, id: `msg-${Date.now()}` };
        return { ...event, messages: [...event.messages, newMessage] };
      }
      return event;
    }));
    showToast("Mensagem enviada!");
  };

  const addTaskToEvent = (eventId: string, task: Omit<Task, 'id'|'eventId'>) => {
    setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const newTask: Task = { ...task, id: `task-${Date.now()}`, eventId };
        return { ...event, tasks: [...event.tasks, newTask] };
      }
      return event;
    }));
    showToast("Tarefa criada e atribuída!");
  };

  const addEvaluationToEvent = (eventId: string, evaluation: Omit<Evaluation, 'id'>) => {
     setEvents(prevEvents => prevEvents.map(event => {
      if (event.id === eventId) {
        const newEvaluation: Evaluation = { ...evaluation, id: `eval-${Date.now()}` };
        return { ...event, evaluations: [...event.evaluations, newEvaluation] };
      }
      return event;
    }));
    showToast("Obrigado por sua avaliação!");
    navigateTo(Screen.EVENT_DETAIL, { eventId });
  };
  
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };


  const value = {
    currentUser,
    users,
    events,
    notifications,
    currentScreen,
    screenParams,
    login,
    logout,
    register,
    navigateTo,
    showToast,
    confirmParticipation,
    cancelParticipation,
    createEvent,
    updateTaskStatus,
    addMessageToEvent,
    addTaskToEvent,
    addEvaluationToEvent,
    markNotificationAsRead,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-lg px-6 py-3 rounded-full shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </AppContext.Provider>
  );
};
   