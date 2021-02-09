import React from 'react';

import './Input.scss';

type changeEvent =
  | ((event: React.ChangeEvent<HTMLInputElement>) => void)
  | undefined;
type inputProps = {
  placeHolder?: string;
  onChange?: changeEvent;
};

export const Input: React.FC<inputProps> = ({ placeHolder, onChange }) => {
  return (
    <input className="input" placeholder={placeHolder} onChange={onChange} />
  );
};
