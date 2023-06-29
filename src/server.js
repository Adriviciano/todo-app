import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexión exitosa a MongoDB');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB', error);
});

const todoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  prioridad: { type: Number, required: true},
  descripcion: { type: String, required: false },
});

const Tarea = mongoose.model('Tarea', todoSchema);

module.exports = Tarea;

