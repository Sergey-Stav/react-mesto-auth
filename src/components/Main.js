import { useContext } from "react";
import Card from "./Card.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete,
  } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__info">
          <div className="profile__container-avatar">
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className="profile__avatar"
            />
            <button
              onClick={onEditAvatar}
              className="profile__avatar-button-edit"
              aria-label="открыть форму обновления аватара профиля"
            ></button>
          </div>
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="profile__button-edit opacity"
            aria-label="Редактировать"
          ></button>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__button-add-elements opacity"
          aria-label="Добавить"
        ></button>
      </section>
      <div className="elements page__elements">
        <ul className="cards">
          {cards.map((item) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default Main;
