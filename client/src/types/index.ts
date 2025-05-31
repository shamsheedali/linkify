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
