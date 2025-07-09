"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface PageSizeSelectorProps {
  currentSize: number;
}

export function PageSizeSelector({ currentSize }: PageSizeSelectorProps) {
  const router = useRouter();
  const pageSizeOptions = [5, 10, 20, 50, 100];

  const handleSizeChange = (newSize: string) => {
    router.push(`/dashboard?page=1&size=${newSize}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Items per page:</span>
      <Select value={currentSize.toString()} onValueChange={handleSizeChange}>
        <SelectTrigger className="w-20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
