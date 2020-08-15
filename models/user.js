const mongoose = require('mongoose');

function validator(v) {
  return /((http|https):\/\/)?(www.)?([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|[a-z0-9-]+\.[a-z]+[a-z]+?)(:(?!0{1,5})[0-9]{2,5})?([a-z/]+)?#?/.test(v);
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    validate: validator,
    required: [true, 'Ссылка не валидна!']
  }
});

module.exports = mongoose.model('user', userSchema);
