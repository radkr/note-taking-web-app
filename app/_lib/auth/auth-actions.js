"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import dbConnect from "@/app/_lib/database/database";
import { SignupFormSchema } from "./auth-schema";
import User from "./user-model";
import bcrypt from "bcrypt";
import Note from "@/app/_lib/notes/all-notes-model";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const userAccountLimit = +process.env.USER_ACCOUNT_LIMIT;
const trialPeriodLength = +process.env.TRIAL_PERIOD_LENGTH;

const LIMIT_EXCEEDED = "LIMIT_EXCEEDED";

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function deleteUser(user) {
  // Delete the notes of the deleted user
  const notes = await Note.deleteMany({
    owner: user._id,
  });
  // Delete theuser itself
  await User.findByIdAndDelete(user._id);
}

export async function createUser(validatedFields) {
  // Check number of the active user accounts
  const count = await User.countDocuments();
  // If it exceeds the user account limit
  if (userAccountLimit <= count) {
    const cutoffDate = new Date(Date.now() - trialPeriodLength);
    // Find a user whose trial period has been exceeded
    const user = await User.findOne({ createdAt: { $lt: cutoffDate } }, "_id");
    if (!user) throw new Error(LIMIT_EXCEEDED);
    // And delete that user to make room for the new one
    await deleteUser(user);
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
  // Create the new user account
  let user = new User({ ...validatedFields.data, password: hashedPassword });
  return await user.save();
}

export async function signupAction(formData) {
  // Validate and format signup data
  const validatedFields = SignupFormSchema.safeParse(formData);
  if (!validatedFields.success)
    return { error: validatedFields.error.flatten().fieldErrors };
  try {
    // Connect to the database
    await dbConnect();
    // Check if user already exists
    let user = await User.findOne(
      { email: validatedFields.data.email },
      "email"
    );
    if (user)
      return {
        error: {
          email: "This email is already registered. Try logging in instead.",
        },
      };
    // Create the new user in the database
    user = await createUser(validatedFields);
    // Create user session
    await createSession(user._id.toString());
  } catch (error) {
    if (error.message === LIMIT_EXCEEDED)
      return {
        error: {
          email:
            "The system is currently not accepting new accounts. Please try again later.",
        },
      };
    return {
      error: { email: "An error occurred while creating your account." },
    };
  }
  // Redirect user
  redirect("/notes");
}

export async function loginAction(formData) {
  // Validate and format signup data
  const validatedFields = SignupFormSchema.safeParse(formData);
  if (!validatedFields.success)
    return { error: validatedFields.error.flatten().fieldErrors };
  try {
    // Connect to the database
    await dbConnect();
    // Fetch the user if any
    let user = await User.findOne(
      { email: validatedFields.data.email },
      "email password"
    );
    // Check the password
    const isAuth = user
      ? await bcrypt.compare(validatedFields.data.password, user.password)
      : false;
    if (!isAuth)
      return {
        error: {
          email: "Incorrect email or password. Please try again.",
        },
      };
    // Create user session
    await createSession(user._id.toString());
  } catch (error) {
    return {
      error: { email: "An error occurred while authentication." },
    };
  }
  // Redirect user
  redirect("/notes");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
