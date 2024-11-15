import React from 'react';

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} id="button">
      {label}
    </button>
  );
}

export default Button;
