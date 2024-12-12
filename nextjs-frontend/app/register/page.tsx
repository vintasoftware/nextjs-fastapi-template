"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { register } from "@/components/actions/register-action";
// import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submitButton";
import Link from "next/link";
import { registerRegister } from "@/app/clientService";

// const initialState = { message: "" };

export default function Page() {
  // const [state, dispatch] = useActionState(register, initialState);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");

    // const body = e.target.body.value;
    //
    // fetch("http://localhost:3001/comments", {
    //   method: "POST",
    //   body: JSON.stringify(body)
    // }).then((response) => {
    //   console.log(response);
    //   return response.json(); // do something with response JSON
    // }

    const input = {
    body: {
      email: "an@an.com",
      password: "P123232322#",
      },
    };
    registerRegister(input);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Enter your email and password below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            {/*{state.errors?.email && (*/}
            {/*  <p className="text-green-600">{state.errors.email}</p>*/}
            {/*)}*/}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {/*{state?.errors?.password && (*/}
            {/*  <div>*/}
            {/*    <p>Password must:</p>*/}
            {/*    <ul>*/}
            {/*      {state.errors.password.map((error) => (*/}
            {/*        <li key={error}>- {error}</li>*/}
            {/*      ))}*/}
            {/*    </ul>*/}
            {/*  </div>*/}
            {/*)}*/}
            <SubmitButton text={"sign up"} />
            {/*<div>{state?.message && <p>{state.message}</p>}</div>*/}
            <div className="mt-4 text-center text-sm">
              <Link href="/login" className="underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
