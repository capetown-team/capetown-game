export type CommentType = {
  id: number;
  content: string;
  id_topic: number;
  id_user: number;
};

export const commentRepository = (Comment) => {
  const getAll = (idTopic: number) => {
    return Comment.findAll({ where: { id_topic: idTopic } });
  };

  const add = (content: string, id_topic: number, id_user: number) => {
    return Comment.create({ content, id_topic, id_user });
  };

  return {
    getAll,
    add
  };
};
