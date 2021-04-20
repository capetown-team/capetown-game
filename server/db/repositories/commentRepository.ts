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
    const query = 'Select * from (Select comments.id as id, false as right, comments.content, comments.timeMessage as time, users.avatar as avatar,' + 
    'users.first_name as name, count(distinct replies.id) as replies, count(distinct emotions.id) as likes from comments inner join users '+
    'on comments.userId = users.id left join replies on comments.id = replies.commentId left join emotions on ' +
    `comments.id = emotions.commentId where comments.topicId = ${topicId} group by comments.id, comments.content, ` + 
    'comments.timeMessage, users.avatar, users.first_name UNION ' + 
    'Select comments.id as id, true as type, replies.content, replies.timeMessage as time, users.avatar as avatar,' + 
    'users.first_name as name, 0 as replies, 0 as likes from replies inner join users '+
    `on replies.userId = users.id inner join comments on replies.commentId = comments.id where comments.topicId = ${topicId}) as messsageTable ` + 
    'order by id, right';
    
    const messages = sequelize.query(query).catch((err) => console.log('err', err));

    return messages;
  };

  const add = (content: string, topicId: number, userId: number) => {
    return Comment.create({ timeMessage: new Date(), content, topicId, userId });
  };

  return {
    getAll,
    getMessages,
    add
  };
};
