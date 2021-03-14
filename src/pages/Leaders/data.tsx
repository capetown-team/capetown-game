import { postLiderBoardAll } from '@/middlewares/api';
import { Props } from './Leaders';

let LeaderData: Props[] = [];

export const getLiderBoardData = async () => {
  await postLiderBoardAll({
    ratingFieldName: 'pacmanScore',
    cursor: 0,
    limit: 10
  }).then((response) => {
    for (let i = 0; i < response.data.length; i += 1) {
      LeaderData.push({
        id: i + 1,
        displayName: response.data[i].data.pacmanPlayer,
        avatar: response.data[i].data.pacmanAvatar,
        score: response.data[i].data.pacmanScore
      });
    }
  });
};

export const getLidersData = () => {
  LeaderData = [];
  getLiderBoardData();
  return LeaderData;
};
