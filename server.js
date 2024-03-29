const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
app.all('*', (req, res) => {
  res.json({ 'every thing': 'is awesome' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests');
  });
});
