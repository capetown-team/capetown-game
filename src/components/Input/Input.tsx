import React, { FC, ChangeEvent } from 'react';

import './Input.scss';

type changeEvent = ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
type inputProps = {
  placeholder: string;
  onChange?: changeEvent;
};

export const Input: FC<inputProps> = ({ placeholder, onChange }) => {
  return (
    <input className="input" placeholder={placeholder} onChange={onChange} />
  );
};
