import mongoose, { Schema, model } from "mongoose";

const TagSchema = new Schema({
  name: { type: String, maxlength: 100 },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

TagSchema.index({ owner: 1, name: 1 });

const Tag = mongoose.models.Tag || model("Tag", TagSchema);

export default Tag;
