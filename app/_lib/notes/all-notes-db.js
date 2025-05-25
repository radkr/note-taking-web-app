"use server";

import dbConnect from "@/app/_lib/database/database";
import Note from "./all-notes-model";

function formatDate(date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getPlainNote(note) {
  return {
    ...note.toObject(),
    _id: note._id.toString(),
    lastEdited: formatDate(new Date(note.toObject().lastEdited)),
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
