// Importing important packages
const express = require('express');

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
router.route('/addpangolin').post(function (req, res) {
 let pangolin = new pangolinsModel(req.body);
 pangolin.save()
 .then(game => {
 res.status(200).json({ 'pangolin': 'pangolin Added Successfully' });
 })
 .catch(err => {
 res.status(400).send("Something Went Wrong");
 });
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
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;