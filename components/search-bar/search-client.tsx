"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";
import { SearchCategories } from "./search-categories";
import { SearchAutocompleteInput } from "./search-autocomplete-input";
import { resolveSearchState, type SearchCategory } from "./search-shared";

type SearchClientProps = {
  action: string;
  defaultQuery: string;
  defaultCategory: string;
  categories: SearchCategory[];
};

export const SearchClient = ({
  action,
  defaultQuery,
  defaultCategory,
  categories,
}: SearchClientProps) => {
  const searchParams = useSearchParams();
  const { query: queryFromUrl, category: categoryFromUrl } = resolveSearchState(
    {
      searchParams,
      defaultQuery,
      defaultCategory,
    },
  );

  const [category, setCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  return (
    <form
      method="get"
      action={action}
      className="flex items-center justify-between gap-1.5 relative w-full border max-w-2xl p-4 rounded-md h-11 md:h-15"
    >
      <div className="flex-1">
        <SearchCategories
          categories={categories}
          value={category}
          onValueChange={setCategory}
        />
      </div>
      <div className="flex-2">
        <SearchAutocompleteInput
          defaultQuery={queryFromUrl}
          category={category}
        />
      </div>
      <div className="bg-yellow-500 ml-10">
        <Button
          type="submit"
          className="h-11.25 lg:h-15.25 w-15 cursor-pointer absolute -right-0.5 -bottom-0.5 rounded-md p-0"
        >
          <SearchIcon className="size-6" />
        </Button>
      </div>
    </form>
  );
};
