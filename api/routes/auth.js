const router = require("express").Router();
const pangolin= require("../models/pangolins");
const CryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");

// Inscription
router.post("/register", async (req, res) => {
  const newPangolin= new pangolin({
    username: req.body.username,
    email: req.body.email,
    //hash le mot de passe
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    
  });

  try {
    const savedUser = await newPangolin.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
      // Rechercher l'utilisateur dans la base de données par nom d'utilisateur
      const user = await pangolin.findOne({ email: req.body.email });

      // Vérifier si l'utilisateur existe
      if (!user) {
          // Si l'utilisateur n'existe pas, renvoyer une réponse avec un code de statut 401 (non autorisé)
          return res.status(401).json("Wrong credentials");
      }

      // Décrypter le mot de passe stocké dans la base de données
      const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
      );
      const Oripassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      // Vérifier si le mot de passe soumis par l'utilisateur est correct
      if (Oripassword !== req.body.password) {
          // Si le mot de passe est incorrect, renvoyer une réponse avec un code de statut 401 (non autorisé)
          return res.status(401).json("Wrong credentials!");
      }

      const { password, ...others } = user._doc;
      res.status(200).json({ ...others});
  } catch (err) {
      // Erreur
      res.status(500).json(err);
  }
});

module.exports = router
