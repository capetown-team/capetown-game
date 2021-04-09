export type ReplyType = {
  id: number;
  content: string;
  id_comment: number;
  id_user: number;
};

export const replyRepository = (Reply) => {
  const getAll = (idComment: number) => {
    return Reply.findAll({ where: {id_comment: idComment}});
  };

 const add = (content: string, id_comment: number, id_user: number) => {
    return Reply.create({ content, id_comment, id_user });
  };

  return {
    getAll,
    add
  }
}


