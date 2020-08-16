const Card = require('../models/card');

// GET Все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// POST добавить карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// DELETE Удалить карточку
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId, (err, cardValid) => {
    if (!cardValid) {
      res.status(404).send({ data: 'Карточки не существует' });
    } else {
      Card.deleteOne({ _id: cardId })
        .then((card) => res.send({ data: card }))
        .catch((error) => res.status(500).send({ message: error.message }));
    }
  });
};

// PUT поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(404).send({ data: `Карточки не существует ${err.message}` }));
};

// DELETE убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, { new: true }
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(404).send({ data: `Карточки не существует ${err.message}` }));
};
