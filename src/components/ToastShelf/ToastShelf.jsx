import React from 'react';

import { ToastContext } from '../ToastProvider';

import Toast from '../Toast';
import * as styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts, removeToast, removeAllToasts } =
    React.useContext(ToastContext);

  React.useEffect(() => {
    function removeAllToastsOnEscape(event) {
      if (event.code === 'Escape') {
        removeAllToasts();
      }
    }

    window.addEventListener('keydown', removeAllToastsOnEscape);

    return () => {
      window.removeEventListener('keydown', removeAllToastsOnEscape);
    };
  });

  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, message, variant }) => (
        <li className={styles.toastWrapper} key={id}>
          <Toast variant={variant} handleDismiss={() => removeToast(id)}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
