import { Request, Response , Express } from "express";

export interface MyContext {
  req: Request & { session : Express.Session };
  res: Response;
}
