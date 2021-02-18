import React, { FC, ChangeEvent, FocusEvent } from 'react';

import './Input.scss';

type InputProps = {
  placeholder?: string;
  type?: string;
  onChange?: (event: ChangeEvent) => void;
  name?: string;
  onBlur?: (event: FocusEvent) => void;
  value?: string;
  id?: string;
  disabled?: boolean;
};

export const Input: FC<InputProps> = ({
  value,
  type,
  name,
  onBlur,
  placeholder,
  onChange,
  id,
  disabled
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      name={name}
      onBlur={onBlur}
      className="input"
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};
