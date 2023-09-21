const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username area is required'],
        lowercase: true,
        validate: [validator.isAlphanumeric, 'Only alphanumeric characters']
    },
    email: {
        type: String,
        required: [true, 'Email area is required'],
        unique: true,
        validate: [validator.isEmail, 'Valid email is required']
    },
    password: {
        type: String,
        required: [true, 'Password area is required'],
        minLength:[6, 'At least for 6 characters']
    },
    followers:[
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followings:[
        {
            type:Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        timestamps: true
    });


UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;