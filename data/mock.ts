
import { User, Event, AppNotification, UserRole, EventType, TaskStatus } from '../types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dona Maria',
    email: 'maria@email.com',
    phone: '(11) 98765-4321',
    community: 'Bairro Taquari',
    avatarUrl: 'https://picsum.photos/seed/maria/200',
    roles: [UserRole.ORGANIZER, UserRole.RESIDENT],
  },
  {
    id: 'user-2',
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '(11) 91234-5678',
    community: 'Bairro Taquari',
    avatarUrl: 'https://picsum.photos/seed/joao/200',
    roles: [UserRole.COLLABORATOR, UserRole.RESIDENT],
  },
  {
    id: 'user-3',
    name: 'Ana Costa',
    email: 'ana@email.com',
    phone: '(11) 95555-4444',
    community: 'Bairro Taquari',
    avatarUrl: 'https://picsum.photos/seed/ana/200',
    roles: [UserRole.RESIDENT],
  },
];

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'Festa Junina do Bairro Taquari',
    date: new Date(new Date().getFullYear(), 5, 15, 18).toISOString(),
    location: 'Praça Central',
    description: 'Venha celebrar a tradicional festa junina do nosso bairro com muita comida típica, música e dança. Traga sua família e amigos!',
    type: EventType.FESTA_JUNINA,
    organizerId: 'user-1',
    participants: ['user-1', 'user-2', 'user-3'],
    tasks: [
      { id: 'task-1', eventId: 'event-1', title: 'Organizar decoração', description: 'Comprar bandeirinhas e balões.', assigneeId: 'user-2', dueDate: new Date(new Date().getFullYear(), 5, 14).toISOString(), status: TaskStatus.PENDING },
      { id: 'task-2', eventId: 'event-1', title: 'Preparar comida típica', description: 'Fazer o bolo de fubá e o quentão.', assigneeId: null, dueDate: new Date(new Date().getFullYear(), 5, 15).toISOString(), status: TaskStatus.PENDING },
      { id: 'task-3', eventId: 'event-1', title: 'Montar barracas', description: 'Montar as barracas de brincadeiras e comidas.', assigneeId: 'user-2', dueDate: new Date(new Date().getFullYear(), 5, 15).toISOString(), status: TaskStatus.COMPLETED },
    ],
    messages: [
        {id: 'msg-1', userId: 'user-1', userName: 'Dona Maria', text: 'Pessoal, não se esqueçam de trazer um prato de doce ou salgado para a nossa festa!', timestamp: new Date().toISOString()}
    ],
    evaluations: [],
    isFinished: false,
  },
  {
    id: 'event-2',
    name: 'Mutirão de Limpeza - Praça Sumaré',
    date: new Date(new Date().getFullYear(), 5, 22, 9).toISOString(),
    location: 'Praça Sumaré',
    description: 'Vamos juntos deixar nossa praça mais bonita! Leve luvas e sacos de lixo. A prefeitura fornecerá o material pesado.',
    type: EventType.MUTIRAO,
    organizerId: 'user-2',
    participants: ['user-2', 'user-3'],
    tasks: [],
    messages: [],
    evaluations: [],
    isFinished: false,
  },
  {
    id: 'event-3',
    name: 'Reunião de Moradores - Junho',
    date: new Date(new Date().getFullYear(), 5, 30, 19).toISOString(),
    location: 'Salão Comunitário',
    description: 'Pauta: segurança no bairro e planejamento de eventos para o segundo semestre.',
    type: EventType.REUNIAO,
    organizerId: 'user-3',
    participants: ['user-1', 'user-3'],
    tasks: [],
    messages: [],
    evaluations: [],
    isFinished: false,
  },
  {
    id: 'event-4',
    name: 'Festa da Primavera (Passado)',
    date: new Date(new Date().getFullYear(), 2, 20, 14).toISOString(),
    location: 'Parque das Flores',
    description: 'Evento passado para testar o sistema de avaliação.',
    type: EventType.FESTA_JUNINA,
    organizerId: 'user-1',
    participants: ['user-1', 'user-2', 'user-3'],
    tasks: [],
    messages: [],
    evaluations: [
        {id: 'eval-1', userId: 'user-2', rating: 5, comment: 'Foi ótimo!', answers: {'O evento foi bem organizado?': 'Sim', 'Você participaria novamente?': 'Sim'}}
    ],
    isFinished: true,
  },
];

export const mockNotifications: AppNotification[] = [
    { id: 'notif-1', userId: 'user-2', text: 'Você foi convidado para a Festa Junina do Bairro Taquari', link: { screen: 'EVENT_DETAIL' as any, params: { eventId: 'event-1' } }, isRead: false, timestamp: new Date().toISOString() },
    { id: 'notif-2', userId: 'user-2', text: 'Nova tarefa atribuída: Organizar decoração', link: { screen: 'TASKS' as any, params: {} }, isRead: false, timestamp: new Date().toISOString() },
    { id: 'notif-3', userId: 'user-3', text: 'Lembrete: Mutirão de Limpeza - Praça Sumaré é amanhã!', link: { screen: 'EVENT_DETAIL' as any, params: { eventId: 'event-2' } }, isRead: true, timestamp: new Date().toISOString() },
    { id: 'notif-4', userId: 'user-2', text: 'Dona Maria enviou uma mensagem na Festa Junina do Bairro Taquari', link: { screen: 'EVENT_DETAIL' as any, params: { eventId: 'event-1' } }, isRead: false, timestamp: new Date().toISOString() },
];
   