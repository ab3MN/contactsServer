const app = require('./app');

const url = process.env.MONGODB_URI || process.env.DB_URL;
(() => {
  try {
    require('mongoose').connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.listen(process.env.PORT, () => {
      console.log('Database connection successfu on port ' + process.env.PORT);
    });
  } catch (e) {
    console.log("Database did't connection with error" + e.message);
    process.exit(1);
  }
})();
