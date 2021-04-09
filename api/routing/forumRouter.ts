import { Router } from "express";
import { isAuthMiddleware } from "../../server/middlewares/server-user-auth-middleware";
import { forumService } from "../services/forumService";

export const forumRouter = (apiRouter: Router) => {
  const router: Router = Router();
  const forum = forumService();

  router.get("/topics", isAuthMiddleware, forum.getTopics);
  router.get("/topic/:id", isAuthMiddleware, forum.getTopic);
  router.post("/topic", isAuthMiddleware, forum.addTopic);

  router.get("/comments", isAuthMiddleware, forum.getComments);
  router.post("/comment", isAuthMiddleware, forum.addComment);

  apiRouter.use("/forum", router);
};
