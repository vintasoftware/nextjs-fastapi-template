"use server";

// import axios from 'axios';
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


  // const name = "Anderson";
  //
  // try {
  //   const response = await axios.post('https://nextjs-fastapi-template-backend.vercel.app/hello', { name }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //
  //   console.log('Response:', response.data);
  // } catch (error) {
  //
  //   console.error('Error:', error);
  //   return { message: "failed" };
  // }
  //
  // redirect(`/dashboard`);


  const input = {
  body: {
    name: "Anderson",
  },
  headers: {
    "Content-Type": "application/json", // Ensure JSON content type
    "Accept": "application/json", // Define accept header as in the first request
    // "x-vercel-ja4-digest": "t13d531000_ed6c8d7875f9_518fb456ca59", // (Optional) Use similar headers from the first request
    // "x-vercel-id": "gru1:iad1::vb52n-1734042177044-6fd61c2c3802", // (Optional) Use similar headers
  }
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
