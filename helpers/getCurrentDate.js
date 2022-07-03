module.exports = {
  getCurrentDate: () =>
    new Date().toISOString().slice(0, 10).split('-').reverse().join('.'),
};
