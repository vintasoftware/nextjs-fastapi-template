import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { usersCurrentUser } from "@/app/clientService";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const options = {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  };

  const { error } = await usersCurrentUser(options);

  if (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};