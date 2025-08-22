"use server";

import dbConnect from "@/app/_lib/database/database";
import Note from "./all-notes-model";
import Tag from "@/app/_lib/tags/all-tags-model";
import { verifySession } from "@/app/_lib/auth/auth-actions";
import mongoose from "mongoose";

function getPlainNote(note) {
  const plain = note.toObject();

  return {
    ...plain,
    _id: plain._id.toString(),
    owner: undefined,
    tags: plain.tags?.map((tag) => ({
      ...tag,
      _id: tag._id.toString(),
      owner: undefined,
    })),
  };
}

export async function readAllNotesAction(isArchived, searchTerm) {
  const { userId } = await verifySession();
  await dbConnect();
  let filter = {
    owner: new mongoose.Types.ObjectId(userId),
    isArchived: isArchived,
  };
  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
      { content: { $regex: searchTerm, $options: "i" } },
    ];
  }
  const notes = await Note.find(filter)
    .populate("tags")
    .sort({ updatedAt: -1 });
  const plainNotes = notes.map((note) => {
    return getPlainNote(note);
  });
  return plainNotes;
}

export async function readNoteAction(id) {
  const { userId } = await verifySession();
  await dbConnect();
  try {
    const note = await Note.findById(id).populate("tags");
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
  return {};
}

export async function updateNoteAction(note) {
  await verifySession();
  try {
    const updatedNote = await Note.findOneAndUpdate({ _id: note._id }, note, {
      new: true,
    });
    return getPlainNote(updatedNote);
  } catch (error) {
    return { error: "The note can not be updated." };
  }
}

export async function createNoteAction() {
  const { userId } = await verifySession();
  try {
    const note = new Note({
      owner: new mongoose.Types.ObjectId(userId),
    });
    await note.save();
    return getPlainNote(note);
  } catch (error) {
    return { error: "The note can not be created." };
  }
}

export async function archiveNoteAction(note) {
  note.isArchived = true;
  return updateNoteAction(note);
}

export async function restoreNoteAction(note) {
  note.isArchived = false;
  return updateNoteAction(note);
}

export async function addTagAction({ note, tagName }) {
  const { userId } = await verifySession();
  try {
    // Find the existing tag if any
    let filter = {
      owner: new mongoose.Types.ObjectId(userId),
      name: tagName,
    };
    let tag = await Tag.findOne(filter);
    // Create a new tag if does not exist
    if (!tag) {
      tag = new Tag({
        owner: new mongoose.Types.ObjectId(userId),
        name: tagName,
      });
      await tag.save();
    }
    // Find the note
    const noteToUpdate = await Note.findById(note._id);
    // If the tag has been already added
    if (noteToUpdate.tags.some((id) => id.equals(tag._id))) {
      // Do not add again
      return { message: "Tag added already!" };
    }
    // Add the tag to the note
    noteToUpdate.tags.push(tag._id);
    // Save the note
    noteToUpdate.save();
    return { message: "Tag added successfully!" };
  } catch (error) {
    return { error: "The tag can not be added." };
  }
}
