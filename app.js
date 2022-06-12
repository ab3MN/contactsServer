const express = require('express');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(require('morgan')(formatsLogger));
app.use(require('cors')());
app.use(express.json());

app.use('/contacts', require('./routes/api/contacts'));

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
