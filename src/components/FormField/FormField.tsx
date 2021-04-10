import React, { FC, memo, ChangeEvent } from 'react';
import block from 'bem-cn-lite';
import { FormFieldType } from '@/types.d';

import './FormField.scss';

const b = block('form-field');

type Props = {
  formdata: FormFieldType;
  change: (p: {
    blur?: boolean;
    id: string;
    event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>;
  }) => void;
  id: string;
};

const FormField: FC<Props> = ({ formdata, change, id }) => {
  const showError = () => {
    let errorMessate = null;

    if (formdata.validation && !formdata.valid) {
      errorMessate = (
        <div className={b('error')}>{formdata.validationMessage}</div>
      );
    }

    return errorMessate;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div className={b()}>
            {formdata.config.label && (
              <label htmlFor={id} className={b('label')}>
                {formdata.config.label}
              </label>
            )}
            <input
              id={id}
              className={b('input')}
              // value={formdata.value}
              placeholder={formdata.config.placeholder}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      case 'textarea':
        formTemplate = (
          <div className={b()}>
            {formdata.config.label && (
              <label htmlFor={id} className={b('label')}>
                {formdata.config.label}
              </label>
            )}
            <textarea
              id={id}
              className={b('textarea')}
              placeholder={formdata.config.placeholder}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };

  return <>{renderTemplate()}</>;
};

const WrappedFormField = memo(FormField);

export { WrappedFormField as FormField };
