"use server";

import { cookies } from "next/headers";

import { authJwtLogin } from "@/app/clientService";
import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/definitions";

export async function login(prevState: {}, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { username, password } = validatedFields.data;

  const body = {
    username,
    password,
  };

  const input = {
    body: body,
  };

  const { data, error } = await authJwtLogin(input);
  if (error) {
    return { message: `${error.detail}` };
  }

  (await cookies()).set("accessToken", data.access_token);
  redirect(`/dashboard`);
}
