import { Sequelize, ModelCtor, Model } from 'sequelize-typescript';

export const topicRepository = (
  sequelize: Sequelize,
  Topic: ModelCtor<Model<any, any>>,
  Comment: ModelCtor<Model<any, any>>,
  Reply: ModelCtor<Model<any, any>>
) => {
  const getAll = () => {
    return Topic.findAll({
      attributes: [
        'id',
        'name',
        [Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'message']
      ],
      group: ['topic.id', 'topic.name'],
      include: [
        {
          attributes: [],
          model: Comment,
          include: [{ model: Reply, attributes: [] }]
        }
      ]
    });
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
