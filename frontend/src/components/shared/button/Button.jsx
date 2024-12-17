import React from 'react';
import './Button.css';

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} id="button" class="btn">
      {label}
    </button>
  );
}

export default Button;
