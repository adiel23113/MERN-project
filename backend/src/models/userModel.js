import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        minlength: [3, 'name minimum 3 character'],
        maxlength: [31, 'name maximum 31 character'],
    },
    email: {
        type: String,
        required: [true, 'user email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
    },
    password: {
        type: String,
        required: [true, 'user password is required'],
        minlength: [3, 'the length of user password can be minimum 3 characters'],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
});

const User = model('User', userSchema);

export default User;