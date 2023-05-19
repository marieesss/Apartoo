const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pangolins = new Schema({
 username: {type: String, required: true, unique:true},
 email: {type: String, required: true, unique:true},
 password: {type: String, required:true},
 rôle: {type: String, required:true},
 amis: [
    { pangolinId : {type: String}}
 ],
},
{timestamps: true});

module.exports = mongoose.model('Pangolins', Pangolins);