import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarLink = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarLink.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      submitBtnText="Сохранить"
      isOpened={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-link-input"
        name="avatar_link"
        type="url"
        className="popup__input"
        required
        placeholder="Ссылка на аватар"
        ref={avatarLink}
      />
      <span className="avatar-link-input-error popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
