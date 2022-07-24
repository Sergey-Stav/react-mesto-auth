import checkedFalse from "../images/checked-false.svg";
import checkedTrue from "../images/checked-true.svg";

function InfoTooltip(props) {
  const { registrationComplete, onClose, isOpen } = props;

  let image;
  let text;

  if (registrationComplete) {
    image = checkedTrue;
    text = "Вы успешно зарегистрировались!";
  } else {
    image = checkedFalse;
    text = "Что-то пошло не так! Попробуйте  еще раз.";
  }
  return (
    <div className={`tooltip ${isOpen ? "tooltip_opened" : ""}`}>
      <div className="tooltip__container">
        <img src={image} className="tooltip__image" />
        <h2 className="tooltip__text">{text}</h2>
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
