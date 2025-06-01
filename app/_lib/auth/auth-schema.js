import z from "zod";

export const SignupFormSchema = z.object({
  email: z
    .string({ message: "Please enter a valid email address." })
    .trim()
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string({ message: "At least 8 characters" })
    .trim()
    .min(8, { message: "At least 8 characters" }),
});
