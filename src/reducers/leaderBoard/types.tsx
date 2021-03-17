export type LeaderBoardState = {
  leaders: Props[];
  isSuccessResult: boolean;
  isSuccessBoard: boolean;
  pending: boolean;
  error: boolean | null;
};

export type LeaderBoardType = {
  data: {
    pacmanScore: number;
    pacmanPlayer: string;
    pacmanAvatar: string | null;
    pacmanID: number;
  };
  ratingFieldName: string;
};

export type LeaderBoardAllType = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type Props = {
  id: number;
  displayName: string;
  avatar: null | string;
  score: number;
  index?: number;
};
