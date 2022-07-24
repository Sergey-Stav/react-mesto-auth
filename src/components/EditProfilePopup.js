import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);

  const { isOpen, onClose, onUpdateUser, isLoading } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      submitBtnText="Сохранить"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input
        id="name-input"
        name="name"
        value={name || ""}
        autoComplete="off"
        type="text"
        className="popup__input popup__name"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        onChange={handleChangeName}
      />
      <span className="name-input-error popup__error"></span>
      <input
        id="job-input"
        name="about"
        value={description || ""}
        autoComplete="off"
        type="text"
        className="popup__input popup__job"
        minLength="2"
        maxLength="200"
        required
        placeholder="О себе"
        onChange={handleChangeDescription}
      />
      <span className="job-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
