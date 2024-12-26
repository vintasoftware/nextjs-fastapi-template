"use client";

import { removeItem } from "@/components/actions/items-action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteButtonProps {
  itemId: string;
}

export function DeleteButton({ itemId }: DeleteButtonProps) {
  const handleDelete = async () => {
    await removeItem(itemId);
  };

  return (
    <DropdownMenuItem
      className="text-red-500 cursor-pointer"
      onClick={handleDelete}
    >
      Delete
    </DropdownMenuItem>
  );
}
