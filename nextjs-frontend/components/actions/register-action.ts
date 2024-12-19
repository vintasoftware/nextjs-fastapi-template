"use server";

import { redirect } from "next/navigation";

import { registerRegister, RegisterRegisterError } from "@/app/clientService";

import { registerSchema } from "@/lib/definitions";

export async function register(prevState: unknown, formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const input = {
    body: {
      email,
      password,
    },
  };
  try {
    const { error } = await registerRegister(input);
    if (error) {
      return { server_validation_error: getErrorMessage(error) };
    }
    redirect(`/login`);
  } catch (err) {
    console.error("Registration error:", err);
    return {
      server_error: "An unexpected error occurred. Please try again later.",
    };
  }
}

function getErrorMessage(error: RegisterRegisterError): string {
  let errorMessage = "An unknown error occurred";

  if (typeof error.detail === "string") {
    // If detail is a string, use it directly
    errorMessage = error.detail;
  } else if (Array.isArray(error.detail)) {
    // If detail is an array of ValidationError, extract the messages
    errorMessage = error.detail.map((err) => err.msg).join("; ");
  } else if (typeof error.detail === "object" && "reason" in error.detail) {
    // If detail is an object with a 'reason' key, use that
    errorMessage = error.detail["reason"];
  }

  return errorMessage;
}
