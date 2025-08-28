"use server";

import dbConnect from "@/app/_lib/database/database";
import { verifySession } from "@/app/_lib/auth/auth-actions";
import mongoose from "mongoose";
import Tag from "./all-tags-model";

function getPlainTag(tag) {
  return {
    ...tag.toObject(),
    _id: tag._id.toString(),
    owner: undefined,
  };
}

export async function readAllTagsAction() {
  const { userId } = await verifySession();
  await dbConnect();
  let filter = {
    owner: new mongoose.Types.ObjectId(userId),
  };
  const tags = await Tag.find(filter);
  const plainTags = tags.map((tag) => {
    return getPlainTag(tag);
  });
  return plainTags;
}

export async function readTagAction(tagId) {
  const { userId } = await verifySession();
  await dbConnect();
  let filter = {
    owner: new mongoose.Types.ObjectId(userId),
    _id: new mongoose.Types.ObjectId(tagId),
  };
  const tag = await Tag.findOne(filter);
  return getPlainTag(tag);
}
