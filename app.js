const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(require('morgan')(formatsLogger));

const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

app.use(require('cookie-parser')());
app.use(express.json());

app.use('/contacts', require('./routes/api/contactsRouter'));
app.use('/users', require('./routes/api/usersRouter'));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
