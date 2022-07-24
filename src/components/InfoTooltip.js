function InfoTooltip(props) {
  const { onClose, isOpen, tooltip } = props;
  function handleClickOverlay(evt) {
    evt.target === evt.currentTarget && onClose();
  }

  return (
    <div
      className={`popup tooltip ${isOpen ? "popup_opened" : ""}`}
      onClick={handleClickOverlay}
    >
      <div className="tooltip__container">
        <img src={tooltip.image} className="tooltip__image" alt="Изображение" />
        <h2 className="tooltip__text">{tooltip.text}</h2>
        <button
          className="tooltip__close-button opacity"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
