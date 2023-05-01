export type User = {
  email: string;
  password: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  favoriteImages: string[];
};
