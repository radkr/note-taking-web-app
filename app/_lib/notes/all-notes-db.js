"use server";

import dbConnect from "@/app/_lib/database/database";
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

export async function getAllNotes() {
  await dbConnect();
  const notes = await Note.find();

  const plainNotes = notes.map((note) => {
    const date = new Date(note.toObject().lastEdited);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
    return {
      ...note.toObject(),
      _id: note._id.toString(),
      lastEdited: formattedDate,
    };
  });
  return plainNotes;
}

export async function getNoteWithId(id) {
  await dbConnect();
  try {
    const note = await Note.findById(id).lean();
    if (!note) throw new Error();
    const plainNote = { ...note, _id: note._id.toString() };
    return plainNote;
  } catch (error) {
    return { _id: id, error: "The note can not be found." };
  }
}
