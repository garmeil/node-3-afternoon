const swag = require(`${__dirname}/../models/swag`);

module.exports = {
  add: (req, res, next) => {
    const itemID = req.query.id;
    const item = req.session.user.cart.find(item => item.id == itemID);
    const { user } = req.session;
    console.log(req.query);
    if (item) res.status(200).send(user);
    else {
      const swagger = swag.find(item => item.id == itemID);
      user.cart.push(swagger);
      console.log(swag);
      user.total += swagger.price;
      res.status(200).send(user);
    }
  },
  remove: (req, res, next) => {
    const { user } = req.session;
    const { id } = req.query;
    const deleteItem = user.cart.find(item => item.id == id);

    user.cart.splice(user.cart.indexOf(deleteItem), 1);
    user.total -= deleteItem.price;
    res.status(200).send(user);
  },
  checkout: (req, res, next) => {
    const { user } = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(user);
  }
};
