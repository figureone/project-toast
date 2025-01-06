import React from 'react';

import * as styles from './Button.module.css';

function Button({ className = '', ...delegated }) {
  return <button className={`${styles.button} ${className}`} {...delegated} />;
}

export default Button;
