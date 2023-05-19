const express= require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const pangolinsRoute = require('./routes/pangolins')
const authRoute = require('./routes/auth')

dotenv.config();

  // connexion à la base de données 
    mongoose
  .connect(process.env.MONGO_URL)
  // affiche le message si la connexion est établie
  .then(() => console.log("DB Connection Successfull!"))
  // affiche un message d'erreur si la connection échoue
  .catch((err) => {
    console.log(err);
  });

  app.use(cors())
app.use(express.json());
app.use('/pangolins', pangolinsRoute);
app.use('/auth', authRoute);

  

app.listen(5000, ()=>{
    console.log("Backend server is listening on port 5000")
});
