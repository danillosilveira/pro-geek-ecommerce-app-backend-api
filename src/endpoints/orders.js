const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order.js');

const router = express.Router();

// GET
router.get('/', (req, res) => {
  Order.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// GET:id
router.get('/:id', (req, res) => {
  Order.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});


// POST
router.post('/', (req, res) => {
  const { user, products } = req.body;
  const newOrder = new Order({
    user,
    products
  });

  newOrder.save((err, response) => {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    res.status(200).json({ response });
  });
});

// PATCH
router.patch('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const { status, products } = req.body;

  Order.findOneAndUpdate({ _id: req.params.id }, { $set: { status, products } })
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
