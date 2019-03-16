const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product.js');

const router = express.Router();

// GET
router.get('/', (req, res) => {
  Product.find()
    .then((response) => {
      res.status(200).json({ response });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

// GET:id
router.get('/:id', (req, res) => {
  Product.findOne({ _id: req.params.id })
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
  const { name, price, leadTime, image, description, material, height, manufacturer, category } = req.body;

  Product.findOneAndUpdate({ _id: req.params.id }, { $set: { name, price, leadTime, image, description, material, height, manufacturer, category: [] } })
    .then(() => {
      Product.findOneAndUpdate({ _id: req.params.id }, { $push: { category } })
        .then((response) => {
          res.json({ response });
        })
        .catch(err => res.status(400).json(err));
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE COMMENT
router.put('/comment/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const { rating } = req.body;

  Product.findOneAndUpdate({ _id: req.params.id }, { $set: { rating } })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// PATCH
router.patch('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  const { rating } = req.body;

  Product.findOneAndUpdate({ _id: req.params.id }, { $push: { rating } })
    .then(response => res.json(response))
    .catch(err => res.status(400).json(err));
});

// DELETE
router.delete('/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Product.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json({
        message: 'Successfully Deleted'
      });
    });
});

// POST
router.post('/', (req, res) => {
  const { name, price, leadTime, image, description, material, height, manufacturer, category } = req.body;
  if (name === '' || price === '') {
    res.status(400).json({ message: 'Please fill name and price fields' });
    return;
  }
  const newProduct = new Product({
    name,
    price,
    leadTime,
    image,
    description,
    material,
    height,
    manufacturer,
    category
  });

  newProduct.save((err, obj) => {
    if (err) {
      res.status(400).json({ message: err });
      return;
    }
    res.status(200).json(obj);
  });
});

module.exports = router;
