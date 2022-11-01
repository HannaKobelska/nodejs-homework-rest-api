const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleSaveErrors} = require("../helpers")

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        default: "",
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
     },
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const updateUserSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").optional(),
}).min(1);

const schemas = {
    registerSchema,
    loginSchema,
    updateUserSubscriptionSchema,
}

module.exports = {
    User,
    schemas,
} 