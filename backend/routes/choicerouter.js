const express = require("express");
const router = express.Router();
const choicectrl = require('../controllers/choicecontroller');

router.get('/random', choicectrl.getRandomCard);
router.post('/submit', choicectrl.submitChoice);
router.post('/resetUsedFields', choicectrl.resetUsedFields); // Add this line

module.exports = router;
