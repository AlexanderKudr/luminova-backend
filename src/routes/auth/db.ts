const users = [
  {
    id: 1,
    email: "test@test.com",
    password: "password",
    name: "Jane Doe",
    refreshToken: null as string | null,
  },
];

const getUserBy = (userEmail: string) => users.find(({ email }) => email === userEmail);
export { getUserBy, users };
