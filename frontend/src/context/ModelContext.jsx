//This use For Provide Model To all the components


import React, { createContext, useContext, useState } from "react";
import Modal from "../components/shared/Model/Model";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState(null);

  const showModal = ({ title, message, actions, onClose }) => {
    setModalProps({ title, message, actions, onClose });
  };

  const hideModal = () => {
    if (modalProps?.onClose) modalProps.onClose();
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalProps && (
        <Modal
          title={modalProps.title}
          message={modalProps.message}
          actions={modalProps.actions}
          onClose={hideModal}
        />
      )}
    </ModalContext.Provider>
  );
};
