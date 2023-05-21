type User = {
  name: string;
  email: string;
  password: string;
  accessToken: string | null;
  refreshToken: string | null;
  confirmedemail: boolean;
  favoriteImages: string[];
};
type UpdateUserTokens = Pick<User, "email" | "accessToken" | "refreshToken">;
export type { User, UpdateUserTokens };
