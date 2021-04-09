import { Request, Response } from 'express';
import { topicRepository } from '../../db/repositories/topicRepository';
import { commentRepository } from '../../db/repositories/commentRepository';
import { replyRepository } from '../../db/repositories/replyRepository';
import sequelize, { modelTopic, modelComment, modelReply } from '../../db/init/db_init';

export const forumService = () => {
  const topic = topicRepository(sequelize, modelTopic, modelComment, modelReply);
  const comment = commentRepository(modelTopic);
  const reply = replyRepository(modelReply);

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
    const { name, content, userid } = req.body;

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
    .add(name, content, userid)
    .then(topic => {
      res.status(200).send(topic);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: { type: "db error", data: JSON.stringify(err) } });
    });
  };

  const getComments = (req: Request, res: Response) => {
    const { idTopic } = req.body;
    comment
      .getAll(idTopic)
      .then((comments) => res.status(200).json(comments))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  
  const addComment = (req: Request, res: Response) => {
    const { content, topicid, userid } = req.body;

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
    .add(content, topicid, userid)
    .then(topic => {
      res.status(200).send(topic);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: { type: "db error", data: JSON.stringify(err) } });
    });
  };

  const getReplies = (req: Request, res: Response) => {
    const { commentid } = req.body;
    reply
      .getAll(commentid)
      .then((replies) => res.status(200).json(replies))
      .catch((err) => res.status(500).json({ error: ['db error', err] }));
  };

  const addReply = (req: Request, res: Response) => {
    const { content, commentid, userid } = req.body;

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
    .add(content, commentid, userid)
    .then(reply => {
      res.status(200).send(reply);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: { type: "db error", data: JSON.stringify(err) } });
    });
  };

  return { getTopics, getTopic, addTopic, getComments, addComment, getReplies, addReply };
};
