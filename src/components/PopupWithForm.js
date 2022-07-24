function PopupWithForm(props) {
  const { name, title, submitBtnText, isOpened, onClose, children, onSubmit, isLoading } =
    props;
    function handleClickOverlay(evt) {
      evt.target === evt.currentTarget && onClose();
    } 
  return (
    <div className={`popup popup_type_${name} ${isOpened && "popup_opened"}`}
      onClick={handleClickOverlay}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close opacity"
          type="button"
          aria-label="закрыть"
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}

          <button className="popup__button" type="submit">
            {isLoading ? ((name === 'confirm') ? 'Удаление...' : 'Сохранение...') : submitBtnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
