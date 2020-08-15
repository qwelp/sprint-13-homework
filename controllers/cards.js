const Card = require('../models/card');

// GET Все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// GET Карточка по id
module.exports.getCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// POST добавить карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// DELETE Удалить карточку
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId, function (err, card) {
    if(!card) {
      res.status(404).send({ data: 'Карточки не существует' });
    } else {
      Card.deleteOne({ _id: cardId })
        .then((card) => res.send({ data: card }))
        .catch((err) => res.status(400).send({ message: err.message }));
    }
  });
};

// PUT поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true }, function (err, card) {
    if(!card) {
      res.status(404).send({ data: 'Карточки не существует' });
    } else {
      res.status(200).send({ data: card });
    }
  });
};

// DELETE убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true }, function (err, card) {
    if(!card) {
      res.status(404).send({ data: 'Карточки не существует' });
    } else {
      res.status(200).send({ data: card });
    }
  });
};
