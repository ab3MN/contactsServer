'use strict';
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    role: {
      type: String,
      default: 'user',
    },
  },
  { versionKey: false }
);

module.exports = {
  UserModel: model('User', userSchema),
  userValidateSchema: Joi.object({
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  }),
  subscriptionSchema: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
  }),
};
