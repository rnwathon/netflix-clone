import { useState } from 'react';

const useModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, toggleModal, openModal, closeModal };
};

export default useModal;
