import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
  const { isOpen, onClose, onDeleteCard, isLoading } = props;
  function handleSubmit(evt) {
    evt.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      submitBtnText="Да"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default ConfirmPopup;
