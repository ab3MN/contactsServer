const express = require('express');
require('dotenv').config();

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(require('morgan')(formatsLogger));

/* PUBLIC  */
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (_, res) => {
  res.sendFile(path.resolve() + '/instruction/index.html');
});

/* CORS COOKIE JSON */
const cors = require('cors');
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(require('cookie-parser')());
app.use(express.json());

/* ROUTES */

app.use('/contacts', require('./routes/api/contactsRouter'));
app.use('/users', require('./routes/api/usersRouter'));
app.use('/tasks', require('./routes/api/tasksRouter'));
app.use('/datebooks', require('./routes/api/dateBooksRouter'));
app.use('/quote', require('./routes/api/quoteRouter'));
app.use('/books', require('./routes/api/booksRouter'));
app.use('/weather', require('./routes/api/weatherRouter'));
app.use('/news', require('./routes/api/newsRouter'));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
