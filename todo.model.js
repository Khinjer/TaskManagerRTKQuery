import { model, Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model('todos', todoSchema);
