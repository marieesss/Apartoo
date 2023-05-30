// Importing important packages
const express = require('express');
const mongoose = require('mongoose');


// Using express and routes
const app = express();
const router = express.Router();

// pangolin module which is required and imported
let pangolinsModel= require('../models/pangolins')

// To Get List Of Pangolins
router.get("/", async (req, res) => {
    try{
        const pangolin = await pangolinsModel.find();
        res.status(200).json(pangolin);

    }catch(err){
        res.status(500).json(err);
    }
})

// To Add New Pangolins
router.post('/addpangolin',  (req, res) => {
 let pangolin = new pangolinsModel(req.body);
 pangolin.save()
 .then(res => {
 res.status(200).json({ 'pangolin': 'pangolin Added Successfully' });
 })
 .catch(err => {
 res.status(400).send("Something Went Wrong");
 });
});



router.get('/information/:id', async (req, res) => {
  const pangolinId = req.params.id;
  
  try {
    const pangolin = await pangolinsModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(pangolinId) }
      },
      {
        $addFields: {
          amis: {
            $map: {
              input: "$amis",
              in: { $toObjectId: "$$this" } // Conversion de chaque ID en ObjectId
            }
          }
        }
      },
      {
        $lookup: {
          from: 'pangolins',
          localField: 'amis',
          foreignField: '_id',
          as: 'friends'
        }
      }
    ]).exec();
    if (pangolin.length === 0) {
      return res.status(404).json({ error: 'Pangolin not found' });
    }

    res.status(200).json(pangolin[0]);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});






router.get('/editpangolin/:id', async (req, res) => {
  let id = req.params.id;
  try{
      const pangolin = await pangolinsModel.findById(id);
      res.status(200).json(pangolin);

  }catch(err){
      res.status(500).json(err);
  }
})

router.put('/updatepangolin/:id', async (req, res) => {
    try {
      const pangolin = await pangolinsModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(pangolin);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// To Delete The pangolin


router.delete('/deletepangolin/:id', async (req, res) => {
    try {
      await pangolinsModel.findByIdAndDelete(req.params.id);

      await pangolinsModel.updateMany(
        { amis: req.params.id },
        { $pull: { amis: req.params.id } }
      );


      res.status(200).json("Pangolins has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;