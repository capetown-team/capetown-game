import React, { ChangeEvent, useState } from 'react';
import block from 'bem-cn-lite';

import { Button } from '@/components/Button';

import './FilePopup.scss';

const b = block('file-popup');

type Props = {
  title: string;
  label: string;
  btnText: string;
  show: boolean;
  onClose: () => void;
  onSubmit: (f: File) => void;
};

export const FilePopup = ({
  title,
  label,
  btnText,
  show,
  onClose,
  onSubmit
}: Props) => {
  const stateValue: File | null = null;
  const [fileState, setFileState] = useState<File | null>(stateValue);
  const [validState, setValidState] = useState(true);

  const handleChange = (event: ChangeEvent) => {
    if (
      event.target &&
      event.target instanceof HTMLInputElement &&
      event.target.files
    ) {
      const file = event.target.files[0];

      if (file) {
        setFileState(file);
        setValidState(true);
      }
    }
  };

  const handleSubmit = () => {
    if (fileState) {
      onSubmit(fileState);
    } else {
      setValidState(false);
    }
  };

  return (
    <div className={`${b()} ${show ? '' : 'hidden'}`}>
      <div className={b('box')}>
        <button type="button" className={b('close')} onClick={onClose}>
          X
        </button>
        <h3 className={b('title')}>{title}</h3>
        <div className={b('input')}>
          <label>
            {fileState ? fileState.name : label}
            <input type="file" onChange={handleChange} />
          </label>
        </div>
        <div className={b('btn')}>
          <Button type="button" size="s" onClick={handleSubmit}>
            {btnText}
          </Button>
        </div>
        <div className={b('invalid')} hidden={validState}>
          Необходимо выбрать файл
        </div>
      </div>
    </div>
  );
};
