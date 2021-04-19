import React, { memo, FC, useState, useCallback } from 'react';
import block from 'bem-cn-lite';

import { Editor } from '@/components/Editor';

import './ForumComment.scss';

const b = block('forum-comment');

type Props = {
  right: boolean;
  name: string;
  content: string;
  time: string;
  countComments: number;
  countLikes: number;
  avatar?: string;
};

const ForumComment: FC<Props> = ({
  right,
  name,
  content,
  time,
  countComments,
  countLikes,
  avatar
}) => {
  const [isEditor, setEditor] = useState(false);

  const handlerShowEditor = useCallback(() => {
    setEditor(!isEditor);
  }, [isEditor]);

  return (
    <div className={b()}>
      <div className={b('avatar', { right })}>
        <img className={b('img')} src={avatar} alt="name" />
      </div>
      <div className={b('body', { right })}>
        <div>
          <span className={b('title')}>{name}</span>
          <small>{time}</small>
        </div>
        <p>{content}</p>
      </div>
      {!right && (
        <footer className={b('footer')}>
          <span className={b('link', { active: true })}>
            <span className={b('icon')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17,2.9A6.43,6.43,0,0,1,23.4,9.33c0,3.57-1.43,5.36-7.45,10l-2.78,2.16a1.9,1.9,0,0,1-2.33,0L8.05,19.37C2,14.69.6,12.9.6,9.33A6.43,6.43,0,0,1,7,2.9a6.46,6.46,0,0,1,5,2.54A6.46,6.46,0,0,1,17,2.9ZM7,4.7A4.63,4.63,0,0,0,2.4,9.33c0,2.82,1.15,4.26,6.76,8.63l2.78,2.16a.1.1,0,0,0,.12,0L14.84,18c5.61-4.36,6.76-5.8,6.76-8.63A4.63,4.63,0,0,0,17,4.7c-1.56,0-3,.88-4.23,2.73L12,8.5l-.74-1.07C10,5.58,8.58,4.7,7,4.7Z" />
              </svg>
            </span>
            <span className={b('count')}>{countLikes}</span>
          </span>
          <span className={b('link')}>
            <span
              className={b('icon')}
              onClick={handlerShowEditor}
              role="presentation"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m7.84 22.53a2 2 0 0 1 -.74-1.53v-2.1h-1.6a3.26 3.26 0 0 1 -3.4-3.4v-9a3.26 3.26 0 0 1 3.4-3.4h13a3.26 3.26 0 0 1 3.4 3.4v9a3.26 3.26 0 0 1 -3.4 3.4h-4.66l-3.72 3.26a1.69 1.69 0 0 1 -2.28.37zm4.93-5.09a1.4 1.4 0 0 1 .92-.35h4.81a1.47 1.47 0 0 0 1.6-1.6v-9a1.47 1.47 0 0 0 -1.6-1.6h-13a1.47 1.47 0 0 0 -1.6 1.61v9a1.47 1.47 0 0 0 1.6 1.6h2.5c.7.2.7.2.9.9v2.83z" />
              </svg>
            </span>
            <span className={b('count')}>{countComments}</span>
          </span>
        </footer>
      )}
      {isEditor && <Editor small />}
    </div>
  );
};

const WrappedForumComment = memo(ForumComment);

export { WrappedForumComment as ForumComment };
