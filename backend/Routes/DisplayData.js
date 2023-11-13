const express = require('express');
const router = express.Router();


router.post('/foodData', async (req, res) => {
  try {
    if (global.food_items) {
      console.log(global.food_items)
      res.send([global.food_items,global.foodCategory]); // Sending JSON response
    } else {
      res.status(404).json({ message: 'Data not found' }); // Handle the case when data is not available
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' }); // Handle server errors
  }
});

module.exports = router;
