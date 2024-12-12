"use server";


import { hello } from "@/app/clientService";
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

  // const { username, password } = validatedFields.data;

  const input = {
    body: {
     name: "Anderson"
    },
  };
  const { error } = await hello(input);
  console.log("Request payload:", input);
  console.log("Request payload:", error);
  if (error) {
    return { message: "failed" };
  }
  // (await cookies()).set("accessToken", data.access_token);
  redirect(`/dashboard`);
}
