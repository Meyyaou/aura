const { Router } = require("express");
const router = Router();
const choicectrl = require('../controllers/choicecontroller');

router.get('/random', choicectrl.getRandomCard);
router.post('/submit', choicectrl.submitChoice);

module.exports = router;
