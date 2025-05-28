const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ];
  res.json(categories);
});

module.exports = router;
