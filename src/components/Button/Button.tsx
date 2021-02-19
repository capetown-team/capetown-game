import React, { memo, FC, ButtonHTMLAttributes, ReactNode } from 'react';
import block from 'bem-cn-lite';

import { ClickType } from '@/types.d';

import './Button.scss';

const b = block('button');

type Props = {
  id?: string;
  placeholder?: string;
  onClick?: ClickType;
  size: string;
  type?: 'submit' | 'button';
  children: ReactNode | string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<Props> = ({ id, size, children, onClick, disabled, type }) => {
  const className = b({ size });
  return (
    <button
      id={id}
      disabled={disabled}
      type={type === 'button' ? 'button' : 'submit'}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);

export { WrappedButton as Button };
