// import { NextFunction, Request, Response } from "express";
// import { verifyJWT } from "./utils.js";

// const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
//   console.log("deserializeUser");
//   console.log(req.cookies, "req.cookies");
//   const { accessToken } = req.cookies;
//   if (!accessToken) {
//     return next();
//   }
//   const { payload } = verifyJWT(accessToken);
//   if (payload) {
//     console.log(payload, "payload");
//     //@ts-ignore
//     req.user = payload;
//     return next();
//   }
//   return next();
// };
// const requireUser = (req: Request, res: Response, next: NextFunction) => {
//   //@ts-ignore
//   if (!req.user) {
//     return res.status(403).send("Unauthorized");
//   }
//   return next();
// };
// export { deserializeUser, requireUser };
