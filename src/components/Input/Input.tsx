import React, { FC } from 'react';

import { InputType } from '@/types.d';

import './Input.scss';

type InputProps = {
  placeholder?: string;
  type?: string;
  onChange?: InputType;
  name?: string;
  onBlur?: InputType;
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
