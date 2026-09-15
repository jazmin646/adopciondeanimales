import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://jazminstuardo629_db_user:YqWZfl5Nr0zAWxTm@cluster0.e5cgtsx.mongodb.net/hola?retryWrites=true&w=majority';

const { Schema, model } = mongoose;

const adoptionSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  message: { type: String, required: true }
});

const Adoption = model('Adoption', adoptionSchema);

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home', { title: 'Adopta con amor' });
});

app.post('/adopciones', async (req, res) => {
  try {
    await Adoption.create(req.body);
    res.redirect('/gracias');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get('/gracias', (req, res) => {
  res.send('¡Gracias por tu solicitud!');
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));
  })
  .catch(err => console.error(err));