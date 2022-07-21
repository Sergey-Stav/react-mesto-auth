import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const handleCardClick = () => {
    onCardClick(card);
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;
  const handleLikeClick = () => {
    onCardLike(card);
  };
  const handleDeleteClick = () => {
    onCardDelete(card);
  };
  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleCardClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like">
          <button
            className={cardLikeButtonClassName}
            aria-label="Мне нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn ? (
        <button
          className="card__trash"
          aria-label="Удаление карточки"
          onClick={handleDeleteClick}
        ></button>
      ) : null}
    </li>
  );
}
export default Card;
