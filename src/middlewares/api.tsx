import { client, localClient, path } from '@/api';
import {
  UserType,
  SignInType,
  SignUpType,
  UserProfileType,
  UserPasswordType
} from '@/reducers/user/types';
import { ThemeListType } from '@/reducers/theme/types';

import {
  LeaderBoardType,
  LeaderBoardAllType
} from '@/reducers/leaderBoard/types';
import {
  TopicProps,
  TopicTableProps,
  CommentProps,
  ReplyProps,
  EmotionProps
} from '@/reducers/forum/types';
import { FeedbackCreateType, FeedbackType } from '@/reducers/feedback/types';

export type ResponseUserType = {
  data: UserType;
};

export type ResponseType = {
  status: number;
  data: {
    id: number;
  };
};

export type ResponseLeaders = {
  data: LeaderBoardType[];
};

export type ResponseTopic = {
  data: TopicProps[];
};

export type ResponseComment = {
  data: CommentProps[];
};

export type ResponseReply = {
  data: ReplyProps[];
};

export type ResponseEmotion = {
  data: EmotionProps[];
};
export type ResponseThemeType = {
  data: {
    theme: {
      id: number;
      data: { [name: string]: string };
    };
  };
};

export type ResponseThemeListType = {
  data: ThemeListType;
};

export type ResponseFeedbackAdd = {
  data: {
    success: boolean;
    err?: { errors: { email: { message: string } } };
  };
};

export type ResponseFeedback = {
  data: FeedbackType[];
};

export interface IApi {
  getUserInfo(): Promise<ResponseUserType>;
  logOut(): Promise<ResponseType>;
  signIn(body: SignInType): Promise<ResponseType>;
  signUp(body: SignUpType): Promise<ResponseType>;
  changeUser(body: UserProfileType): Promise<ResponseUserType>;
  changePassword(body: UserPasswordType): Promise<ResponseType>;
  changeAvatar(avatar: File): Promise<ResponseUserType>;
  themesListRequest(): Promise<ResponseThemeListType>;
  userThemeRequest(userId: number): Promise<ResponseThemeType>;
  changeThemeRequest(
    userId: number,
    themeId: number
  ): Promise<ResponseThemeType>;
  setLiderBoardResult(body: LeaderBoardType): Promise<ResponseType>;
  getLiderBoardAll(
    data: LeaderBoardAllType,
    cookies?: string
  ): Promise<ResponseLeaders>;
  getTopics(): Promise<ResponseTopic>;
  getComments(topicId: number): Promise<ResponseComment>;
  getReplies(): Promise<ResponseComment>;
  postClientID(body: string): Promise<ResponseType>;
  addTopic(topic: TopicTableProps): Promise<ResponseTopic>;
  addComment(comment: CommentProps): Promise<ResponseComment>;
  addReply(reply: ReplyProps): Promise<ResponseReply>;
  addEmotion(reply: EmotionProps): Promise<ResponseEmotion>;
  addFeedback(reply: FeedbackCreateType): Promise<ResponseFeedbackAdd>;
  getFeedbackList(): Promise<ResponseFeedback>;
  addUser(user: UserType): Promise<ResponseUserType>;
}

const context = (): IApi => {
  const getUserInfo = async () => {
    return client.get(`${path}/auth/user`);
  };

  const logOut = async () => {
    return client.post(`${path}/auth/logout`, {});
  };

  const postClientID = async (code: string) => {
    const redirect_uri = window.location.origin;
    return client.post(`${path}/oauth/yandex`, { code, redirect_uri });
  };

  const signIn = async (data: SignInType) => {
    return client.post(`${path}/auth/signin`, data);
  };

  const signUp = async (data: SignUpType) => {
    return client.post(`${path}/auth/signup`, data);
  };

  const changeUser = async (data: UserProfileType) => {
    return client.put(`${path}/user/profile`, data);
  };

  const changePassword = async (data: UserPasswordType) => {
    return client.put(`${path}/user/password`, data);
  };

  const changeAvatar = async (avatar: File) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    return client.put(`${path}/user/profile/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  const themesListRequest = async () => {
    return localClient.get(`/theme/list`);
  };

  const userThemeRequest = async (userId: number) => {
    return localClient.get(`/theme/${userId}`);
  };

  const changeThemeRequest = async (userId: number, themeId: number) => {
    return localClient.post(`/theme/change`, { userId, themeId });
  };

  const setLiderBoardResult = async (data: LeaderBoardType) => {
    return client.post(`${path}/leaderboard`, data);
  };

  const getLiderBoardAll = (data: LeaderBoardAllType, cookies: string) => {
    if (cookies) {
      return client.post(`${path}/leaderboard/all`, data, {
        headers: { Cookie: cookies }
      });
    }
    return client.post(`${path}/leaderboard/all`, data);
  };

  const getTopics = () => {
    return localClient.get(`/forum/topics`);
  };

  const getComments = (topicId: number) => {
    return localClient.get(`/forum/topic/${topicId}`);
  };

  const getReplies = () => {
    return localClient.get(`/forum/replies`);
  };

  const addTopic = (data: TopicTableProps) => {
    return localClient.post(`/forum/topic`, data);
  };

  const addComment = (data: CommentProps) => {
    return localClient.post(`/forum/comment`, data);
  };

  const addReply = (data: ReplyProps) => {
    return localClient.post(`/forum/reply`, data);
  };

  const addEmotion = (data: EmotionProps) => {
    return localClient.post(`/forum/emotion`, data);
  };

  const addFeedback = async (data: FeedbackCreateType) => {
    return localClient.post('/feedback/create', data);
  };

  const getFeedbackList = async () => {
    return localClient.get('/feedback/list');
  };

  const addUser = (data: UserType) => {
    return localClient.post(`/forum/user`, data);
  };
  return {
    getUserInfo,
    logOut,
    signIn,
    signUp,
    changeUser,
    changePassword,
    changeAvatar,
    themesListRequest,
    userThemeRequest,
    changeThemeRequest,
    getLiderBoardAll,
    getTopics,
    getComments,
    getReplies,
    addTopic,
    addComment,
    addReply,
    addEmotion,
    setLiderBoardResult,
    postClientID,
    addFeedback,
    getFeedbackList,
    addUser
  };
};

export const api = context();
