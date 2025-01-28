import React, { createContext, useContext, useState, useCallback } from "react";
import CustomAlert from "../components/CustomAlert";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", visible: false });

  const showAlert = useCallback((message) => {
    setAlert({ message, visible: true });
    setTimeout(() => setAlert({ message: "", visible: false }), 5000); // Auto-hide after 5 seconds
  }, []);

  const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.visible && (
        <CustomAlert
          message={alert.message}
          onClose={closeAlert}
          duration={5000}
        />
      )}
    </AlertContext.Provider>
  );
};
