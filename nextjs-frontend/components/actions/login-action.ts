// "use server";
//
// // import axios from 'axios';
// import { authJwtLogin } from "@/app/clientService";
// import { redirect } from "next/navigation";
// import { loginSchema } from "@/lib/definitions";
// import {cookies} from "next/headers";
//
//
// export async function login(prevState: {}, formData: FormData) {
//   const validatedFields = loginSchema.safeParse({
//     username: formData.get("username") as string,
//     password: formData.get("password") as string,
//   });
//
//   if (!validatedFields.success) {
//     return { errors: validatedFields.error.flatten().fieldErrors };
//   }
//
//   const { username, password } = validatedFields.data;
//
//
//   // const name = "Anderson";
//   //
//   // try {
//   //   const response = await axios.post('https://nextjs-fastapi-template-backend.vercel.app/hello', { name }, {
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //   });
//   //
//   //   console.log('Response:', response.data);
//   // } catch (error) {
//   //
//   //   console.error('Error:', error);
//   //   return { message: "failed" };
//   // }
//   //
//   // redirect(`/dashboard`);
//
//
//   const input = {
//   body: {
//     name: "Anderson",
//   },
//   headers: {
//     "Content-Type": "application/json", // Ensure JSON content type
//     "Accept": "application/json, text/plain, */*", // Accept all responses (matching the first request)
//     // "Content-Length": JSON.stringify({ name: "Anderson" }).length,
//   },
// };
//   const { data, error } = await authJwtLogin(input);
//   // console.log("Request payload:", input);
//   // console.log("Request payload:", error);
//   if (error) {
//     return { message: "failed" };
//   }
//   (await cookies()).set("accessToken", data.access_token);
//   redirect(`/dashboard`);
// }
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

  const input = {
    body: {
      username,
      password,
    },
    headers: {
    "Content-Type": "application/json", // Ensure JSON content type
    "Accept": "application/json, text/plain, */*", // Accept all responses (matching the first request)
    "Content-Length": JSON.stringify({
      username,
      password,
    }).length,
  },
  };
  const { data, error } = await authJwtLogin(input);
  if (error) {
    return { message: `${error.detail}` };
  }
  (await cookies()).set("accessToken", data.access_token);
  redirect(`/dashboard`);
}
