type User = {
  name: string;
  email: string;
  password: string;
  accessToken: string | null;
  refreshToken: string | null;
  confirmedemail: boolean;
  favoriteImages: FavoriteImages[];
};
type FavoriteImages = {
  id: number;
  public_id: string;
  user_id: string | null;
  User: User | null;
};

type UpdateUserTokens = Pick<User, "email" | "accessToken" | "refreshToken">;
export type { User, UpdateUserTokens, FavoriteImages };
