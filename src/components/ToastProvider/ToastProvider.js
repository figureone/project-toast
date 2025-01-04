import React from 'react';

export const ToastContext = React.createContext({});

function ToastProvider({ children }) {
  // Example Toast: { id: random-uuid, variant: 'notice', message: 'something' }.
  const [toasts, setToasts] = React.useState([]);

  function removeToast(id) {
    setToasts((currentToasts) =>
      currentToasts.filter((currentToast) => currentToast.id !== id)
    );
  }

  function addToast(message, variant) {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ]);
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
