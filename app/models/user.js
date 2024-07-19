const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
    name:String,
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next) {
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashedPassword = bcrypt.hashSync(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch(error){
        next(error);
    }
})

userSchema.methods.isCorrectPassword = async function(){
    try{
        const isMatch = await bcrypt.compare(this.password, this.password);
        return isMatch;
    } catch(error){
        throw error;
    }
}

userSchema.methods.generateAuthToken = function(){
    const payload = {
        user:{
            id:this._id
        }
    }

    return jwt.sign(payload, 'your_jwt_secret', {expiresIn: '1h'})
}

module.exports = mongoose.model('User', userSchema);