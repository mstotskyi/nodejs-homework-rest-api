import mongoose from 'mongoose';

import { ContactSchemaMSG } from '../libs/messages';

const { Schema, SchemaTypes, model } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `${ContactSchemaMSG.REQUIRE_NAME}`],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
  },
);

const Contact = model('contact', contactSchema);

export default Contact;
