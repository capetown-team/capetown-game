import { Router } from "express";
import { forumRouter } from "./forum";

const apiRouter: Router = Router();

forumRouter(apiRouter);

export default apiRouter;
