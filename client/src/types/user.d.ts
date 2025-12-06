export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  avatarId?: string;
  role: string;
  status: string;
  createdAt: string;
  refreshToken?: string;
}

export interface AdminUser extends User {
  totalBlogs: number;
}