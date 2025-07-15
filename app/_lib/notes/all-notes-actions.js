"use server";

import dbConnect from "@/app/_lib/database/database";
import Note from "./all-notes-model";
import { verifySession } from "@/app/_lib/auth/auth-actions";
import mongoose from "mongoose";

function getPlainNote(note) {
  return {
    ...note.toObject(),
    _id: note._id.toString(),
    owner: undefined,
  };
}

export async function readAllNotesAction(isArchived) {
  const { userId } = await verifySession();
  await dbConnect();
  const notes = await Note.find({
    owner: new mongoose.Types.ObjectId(userId),
    isArchived: isArchived,
  }).sort({ updatedAt: -1 });
  const plainNotes = notes.map((note) => {
    return getPlainNote(note);
  });
  return plainNotes;
}

export async function readNoteAction(id) {
  const { userId } = await verifySession();
  await dbConnect();
  try {
    const note = await Note.findById(id);
    if (!note) throw new Error();
    if (note.owner.toString() !== userId) throw new Error();
    return getPlainNote(note);
  } catch (error) {
    return { error: "The note can not be found." };
  }
}

export async function deleteNoteAction(id) {
  await verifySession();
  await Note.findByIdAndDelete(id);
}

export async function updateNoteAction(note) {
  await verifySession();
  const updatedNote = await Note.findOneAndUpdate({ _id: note._id }, note, {
    new: true,
  });
  return getPlainNote(updatedNote);
}

export async function createNoteAction() {
  const { userId } = await verifySession();
  try {
    const note = new Note({ owner: new mongoose.Types.ObjectId(userId) });
    await note.save();
    return getPlainNote(note);
  } catch (error) {
    return { error: "The note can not be created." };
  }
}

export async function archiveNote(note) {
  note.isArchived = true;
  updateNoteAction(note);
}
