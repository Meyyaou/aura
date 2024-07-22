const Card = require('../card');

// Get a specific card by ID
exports.getOneCard = async (req, res, next) => {
    try {
        const card = await Card.findOne({_id: req.params.id}).exec();
        if (!card) {
            return res.status(404).json({error: 'Card not found'});
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({error});
    }
};

// Get a random card
exports.getRandomCard = async (req, res, next) => {
    try {
        const cards = await Card.aggregate([{ $sample: { size: 1 } }]).exec();
        if (cards.length === 0) {
            return res.status(404).json({error: 'No cards found'});
        }
        res.status(200).json(cards[0]);
    } catch (error) {
        res.status(500).json({error});
    }
};

// Submit a choice
exports.submitChoice = async (req, res, next) => {
    const choiceId = req.body.choiceId;
    // Update score logic here based on the choiceId
    res.status(200).json({ message: 'Choice submitted', choiceId });
};
