import { Request, Response, NextFunction } from "express";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;
type Controller = (req: Request, res: Response) => void;

export type { Middleware, Controller };
