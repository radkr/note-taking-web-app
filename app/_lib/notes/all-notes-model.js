import mongoose, { Schema, model } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, maxlength: 100 },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    content: { type: String },
    isArchived: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.index({ owner: 1 });

const Note = mongoose.models.Note || model("Note", NoteSchema);

export default Note;
