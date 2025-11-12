export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  avatarId?: string;
  role: string;
  createdAt: string;
  refreshToken?: string;
}

