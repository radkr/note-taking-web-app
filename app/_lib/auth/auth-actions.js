"use server";

import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import dbConnect from "@/app/_lib/database/database";
import { SignupFormSchema } from "./auth-schema";
import User from "./user-model";
import bcrypt from "bcrypt";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

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

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
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
    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
    // Create the new user in the database
    user = new User({ ...validatedFields.data, password: hashedPassword });
    await user.save();
    console.log("user.save(): ", user);
    // Create user session
    await createSession(user._id.toString());
  } catch (error) {
    console.log("Error occured: ", error);
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
    console.log("Error occured: ", error);
    return {
      error: { email: "An error occurred while authentication." },
    };
  }
  // Redirect user
  redirect("/notes");
}

export async function logoutAction() {
  console.log("logoutAction");
  await deleteSession();
  redirect("/login");
}
