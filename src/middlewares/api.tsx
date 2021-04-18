import { client, localClient, path } from '@/api';
import {
  UserType,
  SignInType,
  SignUpType,
  UserProfileType,
  UserPasswordType
} from '@/reducers/user/types';

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

export interface IApi {
  getUserInfo(): Promise<ResponseUserType>;
  logOut(): Promise<ResponseType>;
  signIn(body: SignInType): Promise<ResponseType>;
  signUp(body: SignUpType): Promise<ResponseType>;
  changeUser(body: UserProfileType): Promise<ResponseUserType>;
  changePassword(body: UserPasswordType): Promise<ResponseType>;
  changeAvatar(avatar: File): Promise<ResponseUserType>;
  setLiderBoardResult(body: LeaderBoardType): Promise<ResponseType>;
  getLiderBoardAll(
    data: LeaderBoardAllType,
    cookies?: string
  ): Promise<ResponseLeaders>;
  getTopics(): Promise<ResponseTopic>;
  getComments(): Promise<ResponseComment>;
  getReplies(): Promise<ResponseComment>;
  postClientID(body: string): Promise<ResponseType>;
  addTopic(topic: TopicTableProps): Promise<ResponseTopic>;
  addComment(comment: CommentProps): Promise<ResponseComment>;
  addReply(reply: ReplyProps): Promise<ResponseReply>;
  addEmotion(reply: EmotionProps): Promise<ResponseEmotion>;
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
    return client.post(`${path}/oauth/yandex`, { code });
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

  const getComments = () => {
    return localClient.get(`/forum/comments`);
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

  const addUser = (data: UserType) => {
    console.log('userdata2', data);
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
    addUser
  };
};

export const api = context();
