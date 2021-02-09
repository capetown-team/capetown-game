import React, { memo, FC, MouseEvent, ReactNode } from 'react';

import './Button.scss';

type Props = {
  placeholder?: string;
  // Вот такого типа будет достаточно
  onClick: (event: MouseEvent) => void;
  size: string;
  type: string;
  children: ReactNode | string;
};

const Button: FC<Props> = ({ size, children, onClick }) => {
  // Поребейсь ветку на мастер, там появилась библиотека что бы разруливать такие места
  const className = `button button__size_${size}`;
  return (
    <button type="submit" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const WrappedButton = memo(Button);

export { WrappedButton as Button };
