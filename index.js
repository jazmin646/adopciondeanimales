require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const adoptionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  petType: { type: String, required: true, enum: ['Perro', 'Gato', 'Otro'] },
  experience: { type: String, required: true, enum: ['Primera vez', 'Ya he adoptado'] },
  message: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

const Adoption = mongoose.model('Adoption', adoptionSchema);

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Adopta con amor' });
});

app.post('/adopciones', async (req, res) => {
  try {
    await Adoption.create(req.body);
    res.redirect('/gracias');
  } catch (error) {
    console.error('No se pudo guardar la solicitud:', error.message);
    res.status(400).render('home', {
      title: 'Adopta con amor',
      error: 'Revisa los datos del formulario e inténtalo de nuevo.',
      form: req.body
    });
  }
});

app.get('/gracias', (req, res) => {
  res.render('success', { title: 'Solicitud recibida' });
});

app.get('/salud', (req, res) => {
  res.json({ status: 'ok' });
});

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error('Falta la variable de entorno MONGODB_URI.');
  }

  await mongoose.connect(MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`Patitas en Casa disponible en http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('No se pudo iniciar la aplicación:', error.message);
  process.exit(1);
});
