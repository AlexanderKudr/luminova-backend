type User = {
  email: string;
  password: string;
  accessToken: string | null;
  refreshToken: string | null;
  favoriteImages: string[];
};
type UpdateUser = Pick<User, "email" | "accessToken" | "refreshToken">;
export type { User, UpdateUser };
