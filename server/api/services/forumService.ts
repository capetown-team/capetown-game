import { Request, Response } from 'express';
import { topicRepository } from '../../db/repositories/topicRepository';
import { commentRepository } from '../../db/repositories/commentRepository';
import { replyRepository } from '../../db/repositories/replyRepository';
import { emotionRepository } from '../../db/repositories/emotionRepository';
import sequelize, {
  modelUser,
  modelTopic,
  modelComment,
  modelReply,
  modelEmotion
} from '../../db/init/db_init';

export const forumService = () => {
  const topic = topicRepository(
    sequelize,
    modelTopic,
    modelComment,
    modelReply
  );
  const comment = commentRepository(modelComment, modelUser);
  const reply = replyRepository(modelReply);
  const emotion = emotionRepository(modelEmotion);

  const getTopics = (req: Request, res: Response) => {
    topic
      .getAll()
      .then((topics) => res.status(200).json(topics))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const getTopic = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      res.status(400).json({
        error: {
          type: 'parameter error',
          data: 'invalid parametr id'
        }
      });
    }

    topic
      .get(Number(id))
      .then((topics) => res.status(200).json(topics))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const addTopic = (req: Request, res: Response) => {
    const { name, content, userId } = req.body;

    const isNameValid = name.length > 0;
    const isContentValid = content.length > 2;

    if (!isNameValid || !isContentValid) {
      res.status(400).json({
        error: {
          type: 'parameter invalid',
          data: 'incorrect name or content length'
        }
      });
    }

    return topic
      .add(name, content, userId)
      .then((topic) => {
        res.status(200).send(topic);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: { type: 'db error', data: JSON.stringify(err) } });
      });
  };

  const getComments = (req: Request, res: Response) => {
    const topicId = Number(req.params.id);
    comment
      .getAll(topicId)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const addComment = (req: Request, res: Response) => {
    const { content, topicId, userId } = req.body;

    const isContentValid = content.length > 0;

    if (!isContentValid) {
      res.status(400).json({
        error: {
          type: 'invalid parametr',
          data: 'incorrect content length'
        }
      });
    }

    return comment
      .add(content, topicId, userId)
      .then((topic) => {
        res.status(200).send(topic);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: { type: 'db error', data: JSON.stringify(err) } });
      });
  };

  const getReplies = (req: Request, res: Response) => {
    const commentId = Number(req.params.id);
    reply
      .getAll(commentId)
      .then((replies) => res.status(200).json(replies))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const addReply = (req: Request, res: Response) => {
    const { content, commentId, userId } = req.body;

    const isContentValid = content.length > 0;

    if (!isContentValid) {
      res.status(400).json({
        error: {
          type: 'invalid parametr',
          data: 'incorrect content length'
        }
      });
    }

    return reply
      .add(content, commentId, userId)
      .then((reply) => {
        res.status(200).send(reply);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: { type: 'db error', data: JSON.stringify(err) } });
      });
  };

  const getEmotion = (req: Request, res: Response) => {
    const commentId = Number(req.params.id);
    emotion
      .getAll(commentId)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  return {
    getTopics,
    getTopic,
    addTopic,
    getComments,
    addComment,
    getReplies,
    addReply,
    getEmotion
  };
};
