export interface Project {
  name: string;
  description: string;
  _id: string;
}

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  title: string;
  description: string;
  projectId: string;
  status: TaskStatus;
  _id: string;
}

export interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export interface FormDataShape {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskFormProps {
  onSubmit: (data: FormDataShape) => void;
}

export interface TaskEditProps {
  task: Task;
  editForm: FormDataShape;
  setEditForm: (data: FormDataShape) => void;
  cancelEditing: () => void;
  handleUpdateTask: (id: string) => void;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  githubId?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  logIn: (username: string, password: string) => void;
  register: (username: string, email: string, password: string) => void;
  logOut: () => void;
  token: string | null;
  setToken: (token: string) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface EmptyStateProps {
  text?: string;
}

export interface ErrorMessageProps {
  message?: string;
}
