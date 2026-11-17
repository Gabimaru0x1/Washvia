import { useState } from "react";
import { ModalContext } from "./modalContext";

export function ModalProvider({ children, modals }) {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (name) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);
  const renderModal = activeModal === null ? null : modals[activeModal];

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {renderModal && (
        <Modal isVisible onClose={closeModal}>
          {renderModal(closeModal)}
        </Modal>
      )}
    </ModalContext.Provider>
  );
}

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleClose = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/25 backdrop-blur-sm"
      onClick={handleClose}
    >
      {children}
    </div>
  );
};