const {  Schema, model } = require('mongoose');
const bcypte = require('bcrypt-nodejs');

const userSchema = new Schema({
    email:{type:String,required: true, unique: true},
    password:{type:String, required: true}
});

userSchema.methods.encryptPassword = function (password) {
    return bcypte.hashSync(password,bcypte.genSaltSync(10));
}

userSchema.methods.comparetPasswrod = function (password){
    return bcypte.compareSync(password,this.password);
}

module.exports = model('Users',userSchema);
