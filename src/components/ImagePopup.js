function ImagePopup(props) {
  const { card, isOpened, onClose } = props;
  function handleClickOverlay(evt) {
    evt.target === evt.currentTarget && onClose();
  }
  return (
    <div
      className={`popup popup_type_photo ${isOpened && "popup_opened"}`}
      onClick={handleClickOverlay}
    >
      <div className="popup__gallery">
        <button
          className="popup__close opacity"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
