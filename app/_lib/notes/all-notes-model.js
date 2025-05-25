import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: String,
    tags: [String],
    content: String,
    isArchived: Boolean,
  },
  { timestamps: true }
);

const Note = mongoose.models.Note || mongoose.model("Note", NoteSchema);

export default Note;
