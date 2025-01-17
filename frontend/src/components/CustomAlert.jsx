import React, { useEffect, useState, useCallback } from 'react';
import './CustomAlert.css';

const CustomAlert = ({ message, onClose, duration}) => {
  const [progress, setProgress] = useState(100);
  const [isClosing, setIsClosing] = useState(false);

  const closeAlert = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = 100 - (elapsedTime / duration) * 100;
      
      if (newProgress <= 0 || isClosing) {
        clearInterval(timer);
        setProgress(0);
        setTimeout(() => onClose(), 300); // Delay to allow animation to complete
      } else {
        setProgress(newProgress);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [duration, onClose, isClosing]);

  return (
    <div className={`custom-alert ${isClosing ? 'closing' : ''}`}>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      <div className="alert-content">
        <p>{message}</p>
        <button className="close-button" onClick={closeAlert}>&times;</button>
      </div>
    </div>
  );
};

export default CustomAlert;
