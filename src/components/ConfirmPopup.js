import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {
    const { isOpen, onClose, onSubmit } = props;
    console.log(onSubmit)
  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      submitBtnText="Да"
      isOpened={isOpen}
      onClose={onClose}
        onSubmit={onSubmit}
          
    />
  );

}

export default ConfirmPopup;
