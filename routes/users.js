const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  updateAvatarUser
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.delete('/:userId', deleteUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
