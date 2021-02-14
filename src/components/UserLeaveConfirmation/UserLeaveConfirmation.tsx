import React from 'react';
import ReactDOM from 'react-dom';
import { Popup } from '@/components/Popup';

export const UserLeaveConfirmation = (
  message: string,
  callback: (event: boolean) => void
) => {
  const modal = document.createElement('div');
  document.body.appendChild(modal);

  const withCleanup = (answer: boolean) => {
    ReactDOM.unmountComponentAtNode(modal);
    document.body.removeChild(modal);
    callback(answer);
  };

  ReactDOM.render(
    <Popup
      message={message}
      onCancel={() => withCleanup(false)}
      onConfirm={() => withCleanup(true)}
    />,
    modal
  );
};
