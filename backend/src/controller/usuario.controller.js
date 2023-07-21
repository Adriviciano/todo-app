const usuarioCtrl = {};

const Usuario = require('../models/Usuario');

usuarioCtrl.getUsers = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

usuarioCtrl.createUser = async (req, res) => {
  const { nombre, apellido, correo, nickname } = req.body;
  const newUser = new Usuario({
    nombre,
    apellido,
    nickname,
    correo,
    tasks: {}
  });

  try {
    await newUser.save();
    res.json({ message: 'El usuario ha sido creado' });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.nickname) {
      // El error es debido a un duplicado en el campo 'nickname'
      res.status(400).json({ message: 'El nickname ya está en uso' });
    } else {
      // Otro tipo de error
      console.error(error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
  }
};

usuarioCtrl.getUser = async (req, res) => {
  const nickname = req.params.nickname;
  const usuario = await Usuario.findOne({ nickname: { $regex: new RegExp(`^${nickname}$`, 'i') } })
  res.json(usuario);
};

usuarioCtrl.deleteUser = async (req, res) => {
  const nickname = req.params.nickname;
  await Usuario.findOneAndDelete({ nickname: { $regex: new RegExp(`^${nickname}$`, 'i') } });
  res.json({ message: 'El usuario ha sido borrado' });
};

usuarioCtrl.updateUser = async (req, res) => {
  const { nombre, apellido, correo, nickname, tasks } = req.body;
  const filter = { nickname: req.params.nickname };
  const update = { nombre, apellido, correo, nickname, tasks };
  const options = { new: true };

  try {
    const updatedUser = await Usuario.findOneAndUpdate(filter, update, options);
    res.json({ message: 'El usuario ha sido actualizado', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};


module.exports = usuarioCtrl;
