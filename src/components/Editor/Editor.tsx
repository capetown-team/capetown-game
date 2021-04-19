import React, {
  FC,
  memo,
  useCallback,
  MouseEvent,
  useEffect,
  useRef
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';
import { addComment } from '@/reducers/forum/actions';

import { userSelector } from '@/reducers/user/selectors';
import { AppState } from '@/reducers';
import { getTopicId } from '@/pages/Forum/helper';

import './Editor.scss';

const b = block('editor');

type Props = {
  small: boolean;
};

const Editor: FC<Props> = ({ small }) => {
  const dispatch = useDispatch();
  const topicId = getTopicId();
  const editorRef = useRef<HTMLDivElement>(null);

  const { user } = useSelector((state: AppState) => {
    return {
      user: userSelector(state)
    };
  });
  const submitHandler = useCallback((e: MouseEvent<Element>) => {
    e.preventDefault();
    const target = editorRef.current;

    if (user !== null) {
      dispatch(
        addComment({
          content: target.innerHTML,
          topicId,
          userId: user.id
        })
      );
    }
  }, []);

  return (
    <form className={b()}>
      <div className={b('body')}>
        <div
          className={b('value', { small })}
          contentEditable="true"
          spellCheck="true"
          ref={editorRef}
        />
      </div>
      <Button
        size="s"
        otherClass={b('btn')}
        onClick={(e: React.MouseEvent<Element, globalThis.MouseEvent>) =>
          submitHandler(e)
        }
      >
        Отправить
      </Button>
    </form>
  );
};

const WrappedForumCreateMessage = memo(Editor);

export { WrappedForumCreateMessage as Editor };
