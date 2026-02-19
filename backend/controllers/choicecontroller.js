const Card = require('../card');

exports.getRandomCard = async (req, res, next) => {
    try {
      const cards = await Card.find({ used: false }).exec();
      if (cards.length === 0) {
        return res.status(404).json({ error: 'No cards available' });
      }
      //pick a random card from available cards
      const randomIndex = Math.floor(Math.random() * cards.length);
      const card = cards[randomIndex];
  
      // cocher that the card as used
      await Card.updateOne({ _id: card._id }, { $set: { used: true } });
  
      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ error });
    }
  };
  
// submit a choice
exports.submitChoice = async (req, res, next) => {
    const choiceId = req.body.choiceId;

    // update score logic here based on the choiceId
    res.status(200).json({ message: 'Choice submitted', choiceId });
};

// reset the 'used' field of all cards to false
exports.resetUsedFields =  async (req, res) => {
    try {
      // update all cards to set 'used' to false
      await Card.updateMany({}, { $set: { used: false } });
      res.status(200).send('Used fields reset successfully');
    } catch (error) {
      res.status(500).send('Error resetting used fields');
    }
  };


