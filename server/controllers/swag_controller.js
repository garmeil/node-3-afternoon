const swag = require(`${__dirname}/../models/swag`);

module.exports = {
  read: (req, res, next) => {
    res.status(200).json(swag);
  }
};
