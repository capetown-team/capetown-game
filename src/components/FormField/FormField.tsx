import React, { FC, memo } from 'react';
import block from 'bem-cn-lite';

import { FormFieldType, FormFieldEventType } from '@/types.d';
import { Input } from '@/components/Input';

import './FormField.scss';

const b = block('form-field');

type Props = {
  formdata: FormFieldType;
  change: (p: {
    blur?: boolean;
    id: string;
    event: FormFieldEventType;
  }) => void;
  id: string;
  disabled?: boolean;
};

const FormField: FC<Props> = ({ formdata, change, id, disabled }) => {
  const showError = () => {
    if (formdata.validation && !formdata.valid) {
      return <div className={b('error')}>{formdata.validationMessage}</div>;
    }

    return null;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <div className={b('input')}>
            <label htmlFor={id} className={b('label')}>
              {formdata.config.label && (
                <span className={b('label-text')}>{formdata.config.label}</span>
              )}
              <Input
                id={id}
                type={formdata.config.type}
                disabled={disabled}
                value={formdata.value}
                placeholder={formdata.config.placeholder}
                onBlur={(event) => change({ event, id, blur: true })}
                onChange={(event) => change({ event, id })}
              />
            </label>
            {showError()}
          </div>
        );
        break;
      case 'select':
        formTemplate = (
          <div className="formBlock">
            {formdata.config.label && (
              <label htmlFor={id} className={b('label')}>
                {formdata.config.label}
              </label>
            )}
            <select
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select one</option>
              {formdata.config.options &&
                formdata.config.options.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
            </select>
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
              value={formdata.value}
              disabled={disabled}
              className={b('textarea')}
              placeholder={formdata.config.placeholder}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        );
        break;
      // no default
    }

    return formTemplate;
  };

  return <>{renderTemplate()}</>;
};

const WrappedFormField = memo(FormField);

export { WrappedFormField as FormField };
