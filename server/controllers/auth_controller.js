const users = require(`${__dirname}/../models/users`);
let id = 1;

module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    let user = users.find(
      val => val.username === username && val.password === password
    );
    console.log(req.session);
    if (user) {
      req.session.user.username = user.username;
      res.status(200).send(req.session.user);
    } else {
      res.status(500).send("Unauthorized.");
    }
  },
  register: (req, res, next) => {
    const { session } = req;
    const { username, password } = req.body;
    console.log(username, password);
    users.push({ id, username, password });
    id++;
    console.log(users);
    session.user.username = username;

    res.status(200).send(session.user);
  },
  signout: (req, res, next) => {
    const { session } = req;
    session.destroy();
    res.status(200).send(req.session);
  },
  getUser: (req, res, next) => {
    const { session } = req;
    res.status(200).send(session.user);
  }
};
