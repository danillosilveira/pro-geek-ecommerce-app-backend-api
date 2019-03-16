const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/Category.js');

const router = express.Router();

// GET
router.get('/', (req, res) => {
  Category.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// GET:id
router.get('/:id', (req, res) => {
  Category.findOne({ _id: req.params.id })
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// DELETE
router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Category.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'Successfully Deleted'
      });
    });
});

// PUT
router.put('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
  }
  const { name } = req.body;
  Category.findOneAndUpdate({ _id: req.params.id }, { $set: { name } })
    .then(() => {
      res.json({
        message: 'Successfully Updated'
      });
    });
});

// POST
router.post('/', (req, res) => {
  const { name } = req.body;
  const newCategory = new Category({
    name
  });

  newCategory.save((err) => {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    res.status(200).json({ message: 'New Category created', category: newCategory });
  });
});

module.exports = router;
