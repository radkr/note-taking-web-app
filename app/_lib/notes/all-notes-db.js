"use server";

import dbConnect from "@/app/_lib/database/database";
import Note from "./all-notes-model";

function getPlainNote(note) {
  return {
    ...note.toObject(),
    _id: note._id.toString(),
  };
}

export async function getAllNotes() {
  await dbConnect();
  const notes = await Note.find();
  const plainNotes = notes.map((note) => {
    return getPlainNote(note);
  });
  return plainNotes;
}

export async function getNoteWithId(id) {
  await dbConnect();
  try {
    const note = await Note.findById(id);
    if (!note) throw new Error();
    return getPlainNote(note);
  } catch (error) {
    return { _id: id, error: "The note can not be found." };
  }
}

export async function deleteNoteWithId(id) {
  await Note.findByIdAndDelete(id);
}

export async function updateNoteInDb(note) {
  const updatedNote = await Note.findOneAndUpdate({ _id: note._id }, note, {
    new: true,
  });
  return getPlainNote(updatedNote);
}
