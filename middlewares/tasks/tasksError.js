const { isItADate } = require('../../helpers/isItADate');

module.exports = {
  dateError: (req, res, next) => {
    const { start, finish } = req.body;
    if (!isItADate(start))
      return res.status(415).json({
        message: 'start format is [dd/mm/yyyy,dd-mm-yyyy,dd.mm.yyyy]',
      });
    else if (!isItADate(finish)) {
      return res.status(415).json({
        message: 'finish format is [dd/mm/yyyy, dd-mm-yyyy,dd.mm.yyyy]',
      });
    }
    next();
  },

  statusError: (req, res, next) => {
    if (typeof req.body.isCompleted !== 'boolean')
      return res.status(400).json({ message: 'missing field isCompleted' });
    else if (typeof req.body?.isCompleted !== 'boolean')
      return res.status(415).json({ message: 'Wrong type,must be a boolean' });
    next();
  },

  dataError: (req, res, next) => {
    if (!req.body.title)
      return res.status(400).json({ message: 'missing field title' });
    else if (!req.body.text)
      res.status(400).json({ message: 'missing field text' });
    else if (!req.body.start)
      res.status(400).json({ message: 'missing field start' });
    else if (!req.body.finish)
      res.status(400).json({ message: 'missing field finish' });
    next();
  },
};
