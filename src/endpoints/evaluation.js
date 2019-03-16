const express = require('express');
const mongoose = require('mongoose');
const Evaluation = require('../models/Evaluation.js');

const router = express.Router();

// GET
router.get('/', (req, res) => {
  Evaluation.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// GET:id
router.get('/:id', (req, res) => {
  Evaluation.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// PUT
router.put('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Evaluation.findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      res.status(200).json({ message: 'Successfully Updated' });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


// DELETE
router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Evaluation.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'Successfully Deleted'
      });
    });
});

// POST
router.post('/', (req, res) => {
  const { rating, comment, userId, productId, orderId } = req.body;

  const newEvaluation = new Evaluation({
    rating,
    comment,
    userId,
    productId,
    orderId
  });

  newEvaluation.save((err, obj) => {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    res.status(200).json({ obj });
    return;
  });
});

module.exports = router;
