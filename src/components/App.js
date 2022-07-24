import { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { api } from "../utils/api.js";
import { apiAuth } from "../utils/apiAuth.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
        return;
    }

    Promise.all([api.getCards(), api.getUserInfo(), apiAuth.getUserInfo()])
        .then(([data, user, userPrivate]) => {
            setCards(data);
            setCurrentUser({
                ...user,
                ...userPrivate
            });
        }).catch((err) => {
            console.log(err);
        });
}, [isLoggedIn]);




  // useEffect(() => {
  //   api
  //     .getCards()
  //     .then((data) => {
  //       setCards(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((user) => {
  //       setCurrentUser(user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  //Закрытие popups по ESC
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlace = (card) => {
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCards = (card) => {
    setCards((state) => {
      return state.map((item) => (item._id === card._id ? card : item));
    });
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card)
        .then((card) => {
          updateCards(card);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .setLike(card)
        .then((card) => {
          updateCards(card);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCardDelete = (card) => {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api
        .deleteCard(card)
        .then(() => {
          setCards((state) => {
            return state.filter((item) => item._id !== card._id);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/sign-in");
  };

  const handleRegister = (data) => {
    apiAuth.registerUser(data).then(() => {
      setIsRegistrationComplete(true);
    }).catch(() => {
      setIsRegistrationComplete(false);
    }).finally(() => {
      setIsInfoTooltipOpen(true);
    })
  };

  const handleLogin = (userData) => {
    apiAuth.loginUser(userData).then((data) => {
        if (data.token) {
            apiAuth.setHeaders({
                Authorization : `Bearer ${data.token}`
            });

            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);

            history.push('/');
        }
    }).catch((err) => {
        console.log(err);
    })
}


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={currentUser.data ? currentUser.data.email : ""}
          onSignOut={signOut}
        />
        <Switch>
          <Route path="/sign-up">
          <Register
                          handleRegister={handleRegister}
                          isInfoTooltipOpen={isInfoTooltipOpen}
                          isRegistrationComplete={isRegistrationComplete}
                      />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          submitBtnText="Да"
        ></PopupWithForm>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          isOpened={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  registrationComplete={isRegistrationComplete}
              />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
