const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/gestor-tareas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String
});

const User = mongoose.model('User', userSchema);

const taskSchema = new mongoose.Schema({
  userEmail: String,
  title: String,
  description: String,
  priority: Number
});

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (err) {
    console.error('Error en la ruta de inicio de sesión:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { userEmail, title, description, priority } = req.body;
    const task = new Task({ userEmail, title, description, priority });
    await task.save();

    res.json({ message: 'Tarea añadida exitosamente', task });
  } catch (err) {
    console.error('Error en la ruta de añadir tarea:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
