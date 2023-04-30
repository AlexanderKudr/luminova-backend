const users = [
  {
    id: 1,
    email: "test@test.com",
    password: "password",
    accessToken: null as string | null,
    refreshToken: null as string | null,
  },
];

const getUserBy = (userEmail: string) => users.find(({ email }) => email === userEmail);
export { getUserBy, users };
