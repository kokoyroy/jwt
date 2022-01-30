const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares/verifyToken');
const { usersDB } = require('./usersDB');

app.use(express.json());

const secret = 'paste your Secret key here! don tell anyone:)';

app.post('/api/refresh', (req, res) => {
  // take the refresh token from the user
  console.log(req.body.token)
  const { token } = req.body;
  //send error if there is no token or the token is invalid
  // if everything is ok , create a new access token and send to user
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = usersDB.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      secret,
      { expiresIn: '20s' }
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken: accessToken,
    });
  } else {
    res.json('damn something went wrong!');
  }
});

app.delete('/api/users/:userID', verifyToken, (req, res) => {
  if (req.jwtPayload.id === req.params.userID || req.jwtPayload.isAdmin) {
    res
      .status(200)
      .json(
        `User with ${req.jwtPayload.id} id Has been Deleted ${
          req.jwtPayload.isAdmin ? ' by the Admin' : ''
        }`
      );
  } else {
    res.status(403).json('You are not allowed to delete this user');
  }
});

app.listen(5000, () => console.log('server is running'));
