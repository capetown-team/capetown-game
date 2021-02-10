import React, { memo, FC, MouseEvent, ReactNode } from 'react';
import block from 'bem-cn-lite';

const b = block('button');

import './Button.scss';

type Props = {
  placeholder?: string;
  onClick: (event: MouseEvent) => void;
  size: string;
  type?: string;
  children: ReactNode | string;
  disabled?: boolean;
};

const Button: FC<Props> = ({ size, children, onClick, disabled }) => {
  const className = b({ size });
  return (
    <button
      disabled={disabled}
      type="submit"
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);

export { WrappedButton as Button };
