import { Model, ModelCtor, Sequelize } from 'sequelize-typescript';

export type CommentType = {
  id: number;
  content: string;
  topicId: number;
  userId: number;
};


export const commentRepository = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Comment: ModelCtor<Model<any, any>>
) => {  const getAll = (topicId: number) => {
    return Comment.findAll({
      attributes: ['id', 'content'],
      where: { topicId }
    });
  };

  const getMessages = (topicId: number) => {
    const query = `Select comments.content, comments.timeMessage, users.avatar as avatar, users.first_name as name, count(replies.id) as countReplies, count(emotions.id) as countLikes from comments inner join users on comments.userId = users.id left join replies on comments.id = replies.commentId left join emotions on comments.id = emotions.commentId where comments.topicId = ${topicId} group by comments.content, users.first_name`;
    const messages = sequelize.query(query);

    console.log('messages', messages);
    return messages;
  };

  const add = (content: string, topicId: number, userId: number) => {
    return Comment.create({ content, topicId, userId });
  };

  return {
    getAll,
    getMessages,
    add
  };
};
