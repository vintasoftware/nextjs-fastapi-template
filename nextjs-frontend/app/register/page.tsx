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

import { register } from "@/components/actions/register-action";
import { useActionState } from "react";
import { SubmitButton } from "@/components/ui/submitButton";
import Link from "next/link";

const initialState = { message: "" };

export default function Page() {
  const [state, dispatch] = useActionState(register, initialState);
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <form action={dispatch}>
        <Card className="w-full max-w-sm rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
              Sign Up
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
              Enter your email and password below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-6">
            <div className="grid gap-3">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-gray-300 dark:border-gray-600"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
              )}
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="border-gray-300 dark:border-gray-600"
              />
              {state?.errors?.password && (
                <div className="text-sm text-red-500">
                  <p>Password must:</p>
                  <ul className="list-disc ml-4">
                    {state.errors.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <SubmitButton text="Sign Up" />
            <div className="mt-2 text-sm text-center text-red-500">
              {state?.message && <p>{state.message}</p>}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/login"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
