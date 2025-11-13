
export enum UserRole {
  RESIDENT = 'Morador',
  ORGANIZER = 'Organizador',
  COLLABORATOR = 'Colaborador',
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  community: string;
  avatarUrl: string;
  roles: UserRole[];
}

export enum EventType {
  FESTA_JUNINA = 'Festa Junina',
  MUTIRAO = 'Mutirão',
  REUNIAO = 'Reunião',
  OUTRO = 'Outro',
}

export enum TaskStatus {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Andamento',
  COMPLETED = 'Concluída',
}

export interface Task {
  id: string;
  eventId: string;
  title: string;
  description: string;
  assigneeId: string | null;
  dueDate: string;
  status: TaskStatus;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface Evaluation {
  id: string;
  userId: string; // Anonymous, but kept for system integrity
  rating: number;
  comment?: string;
  answers: { [key: string]: string };
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  type: EventType;
  organizerId: string;
  participants: string[];
  tasks: Task[];
  messages: Message[];
  evaluations: Evaluation[];
  isFinished: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  text: string;
  link: { screen: Screen; params: { [key: string]: any } };
  isRead: boolean;
  timestamp: string;
}

export enum Screen {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  HOME = 'HOME',
  EVENT_DETAIL = 'EVENT_DETAIL',
  TASKS = 'TASKS',
  PROFILE = 'PROFILE',
  NOTIFICATIONS = 'NOTIFICATIONS',
  CREATE_EVENT = 'CREATE_EVENT',
  MANAGE_EVENT = 'MANAGE_EVENT',
  EVALUATION = 'EVALUATION',
}
   