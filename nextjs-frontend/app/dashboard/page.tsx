import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { fetchItems } from "@/components/actions/items-action";
import { DeleteButton } from "./deleteButton";
import { ReadItemResponse } from "@/app/openapi-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageSizeSelector } from "@/components/page-size-selector";
import { PagePagination } from "@/components/page-pagination";

interface DashboardPageProps {
  searchParams: Promise<{
    page?: string;
    size?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const size = Number(params.size) || 10;

  const items = (await fetchItems(page, size)) as ReadItemResponse;
  const totalPages = Math.ceil((items.total || 0) / size);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Welcome to your Dashboard</h2>
      <p className="text-lg mb-6">
        Here, you can see the overview of your items and manage them.
      </p>

      <div className="mb-6">
        <Link href="/dashboard/add-item">
          <Button variant="outline" className="text-lg px-4 py-2">
            Add New Item
          </Button>
        </Link>
      </div>

      <section className="p-6 bg-white rounded-lg shadow-lg mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Items</h2>
          <PageSizeSelector currentSize={size} />
        </div>

        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!items.items?.length ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              items.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer p-1 text-gray-600 hover:text-gray-800">
                        <span className="text-lg font-semibold">...</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-2">
                        <DropdownMenuItem disabled={true}>
                          Edit
                        </DropdownMenuItem>
                        <DeleteButton itemId={item.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <PagePagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={size}
          totalItems={items.total || 0}
          basePath="/dashboard"
        />
      </section>
    </div>
  );
}
