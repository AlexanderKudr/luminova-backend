import { Express } from "express";
// import { requireUser } from "./middleware.js";
import { createNewSession, deleteSession } from "./controllers.js";
const routes = (app: Express) => {
  app.post("/api/session", createNewSession);
  app.delete("/api/session", deleteSession);
};
const imagesRoutes = (app: Express) => {
  // app.use("/images", function) 

}
export { imagesRoutes, routes };