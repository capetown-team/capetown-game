import React, { memo, FC, ButtonHTMLAttributes } from 'react';
import block from 'bem-cn-lite';

import { ClickType } from '@/types.d';

import './Button.scss';

const b = block('button');

type Props = {
  placeholder?: string;
  onClick?: ClickType;
  size: string;
  type?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

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
