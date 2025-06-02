export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data: T;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Url {
  _id: string;
  originalUrl: string;
  shortCode: string;
  userId: string;
  clicks: string;
  createdAt: string;
  updatedAt: string;
}
