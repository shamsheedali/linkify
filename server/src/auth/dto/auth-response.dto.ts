export class AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
