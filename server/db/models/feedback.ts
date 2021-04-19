import mongoose, { Schema } from 'mongoose';

import { validateEmail } from '../../utils/validate';

const feedbackSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address']
  },
  text: {
    type: String,
    required: true,
    trim: true
  }
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);
