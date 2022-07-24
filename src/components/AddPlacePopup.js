import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, isLoading } = props;
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      submitBtnText="Создать"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="image-title-input"
        name="name"
        type="text"
        className="popup__input"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="image-title-input-error popup__error"></span>
      <input
        id="image-link-input"
        name="link"
        type="url"
        className="popup__input"
        required
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span className="image-link-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
