import { Sequelize, ModelCtor, Model } from 'sequelize-typescript';

export const topicRepository = (
  sequelize: Sequelize,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Topic: ModelCtor<Model<any, any>>
) => {
  const getAll = () => {
    const query =
      'Select topics.id as id, topics.name, count(messsageTable.id) as message from topics left join (Select comments.topicId as id, comments.id as key from comments UNION ALL ' +
      'Select topics.Id as id, replies.id as key from replies inner join comments on replies.commentId = comments.Id inner join ' +
      'topics on comments.topicId = topics.id) as messsageTable on topics.id = messsageTable.id group by topics.id, topics.name';

    const topics = sequelize
      .query(query)
      // eslint-disable-next-line no-console
      .catch((err) => console.log('err', err));

    return topics;
  };

  const add = (name: string, content: string, userId: number) => {
    return Topic.create({ name, content, userId });
  };

  const get = (id: number) => {
    return Topic.findByPk(id);
  };

  return {
    getAll,
    add,
    get
  };
};
