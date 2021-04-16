import React, { FC, memo } from 'react';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';

import './Editor.scss';

const b = block('editor');

type Props = {
  small: boolean;
};

const Editor: FC<Props> = ({ small }) => {
  return (
    <form className={b()}>
      <div className={b('body')}>
        <div
          className={b('value', { small })}
          contentEditable="true"
          spellCheck="true"
        />
      </div>
      <Button size="s" otherClass={b('btn')}>
        Отправить
      </Button>
    </form>
  );
};

const WrappedForumCreateMessage = memo(Editor);

export { WrappedForumCreateMessage as Editor };
