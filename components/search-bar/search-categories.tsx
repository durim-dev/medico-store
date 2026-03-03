"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SearchCategory } from "./search-shared";

type SearchCategoriesProps = {
  categories: SearchCategory[];
  value: string;
  onValueChange: (value: string) => void;
};

export const SearchCategories = ({
  categories,
  value,
  onValueChange,
}: SearchCategoriesProps) => {
  return (
    <Select name="category" value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full border-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-0 shadow-none">
        <SelectValue placeholder="All categories" />
      </SelectTrigger>
      <SelectContent position="popper" className="mt-3">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="all">All categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
