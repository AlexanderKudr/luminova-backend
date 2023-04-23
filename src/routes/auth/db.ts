export const users = [
  {
    id: 1,
    email: "test@test.com",
    password: "password",
    name: "Jane Doe",
    refreshToken: null as string | null,
  },
];
type Sessions = { sessionId: string; email: string; valid: boolean };
export const sessions: Record<string, Sessions> = {};

export function getSession(sessionId: string) {
  const session = sessions[sessionId];
  console.log(session, "session");

  return session && session.valid ? session : null;
}

export function invalidateSession(sessionId: string) {
  const session = sessions[sessionId];

  if (session) {
    sessions[sessionId].valid = false;
  }
  return sessions[sessionId];
}

export function createSession(email: string, name: string) {
  const sessionId = String(Object.keys(sessions).length + 1);

  const session = { sessionId, email, valid: true, name };

  sessions[sessionId] = session;

  return session;
}

const getUserBy = (userEmail: string) => users.find(({ email }) => email === userEmail);
export { getUserBy };
