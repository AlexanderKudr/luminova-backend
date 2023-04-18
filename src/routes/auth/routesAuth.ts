import { Express } from "express";
import { requireUser } from "./middleware.js";
import { createNewSession, getSession, deleteSession } from "./controllers.js";
export const routes = (app: Express) => {
  app.get("/api/session", getSession);
  app.post("/api/session", createNewSession);
  app.delete("/api/session", deleteSession);
};
