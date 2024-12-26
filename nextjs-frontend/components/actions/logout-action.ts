"use server";

import { cookies } from "next/headers";
import { authJwtLogout } from "@/app/clientService";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { message: "No access token found" };
  }

  const { error } = await authJwtLogout({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (error) {
    return { message: error };
  }

  cookieStore.delete("accessToken");
  redirect(`/login`);
}
