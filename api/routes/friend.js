// Importing important packages
const express = require('express');

// Using express and routes
const app = express();
const router = express.Router();

// pangolin module which is required and imported
let pangolinsModel= require('../models/pangolins')




router.put('/:personId/friends/:friendId', async (req, res) => {

    const personId = req.params.personId;
    const friendId = req.params.friendId;

    try {
        const pangolin = await pangolinsModel.findByIdAndUpdate(
            personId,
          {
            $push: { amis : friendId } 
          },
          { new: true }
        );
        res.status(200).json(pangolin);
      } catch (err) {
        res.status(500).json(err);
      }
  });
  
  
  router.delete('/api/persons/:personId/friends/:friendId', (req, res) => {
    const personId = req.params.personId;
    const friendId = req.params.friendId;
  
    // Retrieve the person from the database using personId
    const person = getPersonById(personId);
  
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
  
    // Remove the friend from the person's friends list
    const friendIndex = person.friends.indexOf(friendId);
    if (friendIndex !== -1) {
      person.friends.splice(friendIndex, 1);
    }
  
    return res.json({ message: 'Friend removed successfully' });
  });

  module.exports = router;
  