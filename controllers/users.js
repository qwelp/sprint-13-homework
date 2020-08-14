const User = require('../models/user');

// GET Получить пользователя по id
module.exports.getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// GET Получить всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// POST Добавить пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// DELETE Удалить пользователя
module.exports.deleteUser = (req, res) => {
  const {
    userId
  } = req.params;

  User.deleteOne({ _id: userId })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// PATCH обновляет профиль
module.exports.updateUser = (req, res) => {
  const {
    name,
    about,
    avatar
  } = req.body;
  const owner = req.user._id;
  const data = {};

  if (name) {
    data[name] = name;
  }

  if (about) {
    data[about] = about;
  }

  if (avatar) {
    data[avatar] = avatar;
  }

  if (Object.keys(data).length) {
    User.updateOne({ _id: owner }, { $set: data })
      .then((user) => res.send({ data: user }))
      .catch((err) => res.status(400).send({ message: err.message }));
  } else {
    res.status(404).send({ message: 'Ошибка' });
  }
};

// PATCH обновляет аватар
module.exports.updateAvatarUser = (req, res) => {
  const {
    avatar: avatarPost
  } = req.body;
  const owner = req.user._id;

  User.updateOne({ _id: owner }, { $set: { avatar: avatarPost } })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};
