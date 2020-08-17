const User = require('../models/user');

// GET Получить пользователя по id
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId, (err, user) => {
    if (!user) {
      res.status(404).send({ data: 'Пользователь не существует' });
    } else {
      res.status(200).send({ data: user });
    }
  });
};

// GET Получить всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// POST Добавить пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// PATCH обновляет профиль
module.exports.updateUser = (req, res) => {
  const {
    name: namePatch,
    about: aboutPatch
  } = req.body;
  const owner = req.user._id;

  User.updateOne({ _id: owner }, { name: namePatch, about: aboutPatch }, { runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// PATCH обновляет аватар
module.exports.updateAvatarUser = (req, res) => {
  const {
    avatar: avatarPost
  } = req.body;
  const owner = req.user._id;

  User.updateOne({ _id: owner }, { $set: { avatar: avatarPost } }, { runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};
