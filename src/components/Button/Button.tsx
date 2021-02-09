import React, { memo, FC } from 'react';

import './Button.scss';

type mouseEvent =
  | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
  | undefined;

type Props = {
  placeHolder?: string;
  onClick?: mouseEvent;
  size: string;
};

const Button: FC<Props> = ({ size, children, onClick }) => {
  const className = `button button__size_${size}`;
  return (
    <button type="submit" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);

export { WrappedButton as Button };
