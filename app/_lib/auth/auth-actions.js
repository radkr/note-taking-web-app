export async function signupAction(formData) {
  console.log("signup: ", formData);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    error: {
      email: "This email is already registered. Try logging in instead.",
    },
  };
}
