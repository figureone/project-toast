import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import * as styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  // Example Toast: { id: random-uuid, variant: 'notice', message: 'something' }.
  const [toasts, setToasts] = React.useState([]);

  // Handler for adding a new Toast when submitting the form.
  const handleSubmit = React.useCallback(
    (event) => {
      // Prevent normal form submit / page reload.
      event.preventDefault();

      // Append new Toast.
      setToasts((currentToasts) => [
        ...currentToasts,
        {
          id: crypto.randomUUID(),
          variant,
          message,
        },
      ]);

      // Reset form controls to default.
      setVariant(VARIANT_OPTIONS[0]);
      setMessage('');
    },
    [variant, message]
  );

  const handleDismiss = React.useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((currentToast) => currentToast.id !== id)
    );
  }, []);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toasts && <ToastShelf toasts={toasts} handleDismiss={handleDismiss} />}

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label htmlFor={`variant-${option}`} key={option}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={option === variant}
                  onChange={(event) => setVariant(event.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
