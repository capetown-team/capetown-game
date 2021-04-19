import { Request, Response } from 'express';

import { Feedback } from '../../db/models/feedback';
import { sendEmail } from '../../utils/mail';

export const feedbackService = () => {
  const createFeedback = (req: Request, res: Response) => {
    const { name, email, text } = req.body;
    const feedback = new Feedback({
      name,
      email,
      text
    });

    feedback.save((err, doc) => {
      if (err) {
        return res.status(400).send({
          success: false,
          err
        });
      }
      sendEmail(email, name, text);
      return res.status(200).send({
        success: true,
        doc
      });
    });
  };

  const getFeedback = (req: Request, res: Response) => {
    Feedback.find((err, doc) => {
      if (err) {
        return res.status(400).send(err);
      }
      return res.status(200).send(doc);
    });
  };

  const removeAllFeedback = (req: Request, res: Response) => {
    Feedback.remove({}, (err) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send('remove all list');
    });
  };

  return {
    createFeedback,
    getFeedback,
    removeAllFeedback
  };
};
