const app = require('./app');

const URL =
  'mongodb+srv://user:user@contacts.ekypp.mongodb.net/db?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

(() => {
  try {
    require('mongoose').connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      console.log('Database connection successfu on port ' + PORT);
    });
  } catch (e) {
    console.log("Database did't connection with error" + e.message);
    process.exit(1);
  }
})();
