const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User.js');

const router = express.Router();

// GET
router.get('/', (req, res) => {
  User.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// GET - PROTECTED ROUTES
router.get('/loggedin', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});

// GET:id
router.get('/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// PUT
router.put('/:id', (req, res) => {
  const { name, username, street, complement, postalCode } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  if (!name || !username) {
    res.status(400).json({ message: 'Please fill all required fields' });
    return;
  }
  User.findOneAndUpdate({ _id: req.params.id }, { name, username, address: { street, complement, postalCode } })
    .then(() => {
      res.json({ message: 'Successfully Updated' });
    })
    .catch((err) => {
      res.json(err);
    });
});

// PATCH
router.patch('/:id', (req, res) => {
  const { userAvaliations, userOrders } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findByIdAndUpdate({ _id: req.params.id }, { $push: { userAvaliations, userOrders } })
    .then(() => {
      res.json({ message: 'Successfully Updated' });
    })
    .catch(err => res.status(400).json(err));
});

// DELETE
router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  User.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'Successfully Deleted'
      });
    });
});

// AUTH-ROUTES --- POSTS ROUTES + GET /loggedin
// POST - SIGNUP
router.post('/signup', (req, res) => {
  const { name, username, password, role } = req.body;
  if (!name || !username || !password) {
    res.json({ message: 'Please fill all required fields' });
    return;
  }
  if (password.length < 5) {
    res.json({ message: 'Please make your password at least 6 characters long for security purposes.' });
    return;
  }
  User.findOne({ username }, (err, found) => {
    if (err) {
      res.json({ message: 'Email check went bad.' });
      return;
    }
    if (found) {
      res.json({ message: 'Email already taken. Please choose another one.' });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      name,
      username,
      role,
      password: hashPass
    });

    newUser.save((error) => {
      if (error) {
        res.json({ message: 'Saving user to database went wrong.' });
      }
    });
    req.login(newUser, (error) => {
      if (error) {
        res.json({ message: 'Login after signup went bad.' });
        return;
      }
      res.status(200).json(newUser);
    });
  });
});

// POST - LOGIN
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, failureDet) => {
    if (err) {
      res.json({ message: 'email authentication got wrong' });
      return;
    }
    if (!user) {
      res.json(failureDet);
      return;
    }
    req.login(user, (error) => {
      if (error) {
        res.json({ message: 'Session save went bad.' });
        return;
      }
      res.status(200).json({ user });
    });
  })(req, res, next);
});

// POST - LOGOUT
router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

module.exports = router;
