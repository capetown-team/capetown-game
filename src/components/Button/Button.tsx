import React, { memo, FC, MouseEvent, ReactNode } from 'react';
import block from 'bem-cn-lite';

import './Button.scss';

const b = block('button');

type Props = {
  placeholder?: string;
  onClick?: (event: MouseEvent) => void;
  size: string;
  type: string;
  children: ReactNode | string;
};

const Button: FC<Props> = ({ size, children, onClick }) => {
  const className = b({ size: 's' });
  return (
    <button type="submit" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);

export { WrappedButton as Button };
