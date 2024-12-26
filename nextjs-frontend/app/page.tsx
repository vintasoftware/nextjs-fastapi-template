import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
          Welcome to the Next.js & FastAPI Boilerplate
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          A simple and powerful template to get started with full-stack
          development using Next.js and FastAPI.
        </p>

        {/* Link to Dashboard */}
        <Link href="/dashboard">
          <Button className="px-8 py-4 text-xl font-semibold rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300">
            Go to Dashboard
          </Button>
        </Link>

        {/* GitHub Badge */}
        <div className="mt-6">
          <Badge
            variant="outline"
            className="text-sm flex items-center gap-2 px-3 py-2 rounded-lg border-gray-300 dark:border-gray-700"
          >
            <FaGithub className="w-5 h-5 text-black dark:text-white" />
            <Link
              href="https://github.com/vintasoftware/nextjs-fastapi-template"
              target="_blank"
              className="hover:underline"
            >
              View on GitHub
            </Link>
          </Badge>
        </div>
      </div>
    </main>
  );
}
