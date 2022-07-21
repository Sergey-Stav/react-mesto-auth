function PopupWithForm(props) {
  const { name, title, submitBtnText, isOpened, onClose, children, onSubmit } =
    props;
  return (
    <div className={`popup popup_type_${name} ${isOpened && "popup_opened"}`}>
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
            {submitBtnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
