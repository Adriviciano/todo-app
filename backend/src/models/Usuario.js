const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  nombre: String,
  apellido: String,
  nickname: { type: String, unique: true },
  correo: String,
  tasks: Object
}, {
  timestamps: true,
});

module.exports = model('Usuario', userSchema);
