export const topicRepository = (sequelize, Topic, Comment, Reply) => {
  const getAll = () => {
    return Topic.findAll({
      attributes: ['id', 'name', [sequelize.fn('COUNT', sequelize.col('Comments.id')), 'message']],
      group: ['topic.id', 'topic.name'],
      include: [
        {
          attributes: [],
          model: Comment,
          include: [{ model: Reply, attributes: [] }]
        }
      ]
    }
    );
  };

  const add = (name: string, content: string, id_author: number) => {
    return Topic.create({ name, content, id_author });
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
