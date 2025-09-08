export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface LoginData {
  identifier: string; // Can be email or username
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}