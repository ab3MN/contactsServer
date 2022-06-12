const app = require('./app');

(() => {
  try {
    require('mongoose').connect(process.env.DB_URL, {
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
