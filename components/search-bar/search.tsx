import { Button } from "../ui/button";
import { Search as SearchIcon } from "lucide-react";
import { SearchCategories } from "./search-categories";

type SearchProps = {
  action?: string;
  defaultQuery?: string;
  defaultCategory?: string;
};

export const Search = ({
  action = "/",
  defaultQuery = "",
  defaultCategory = "all",
}: SearchProps) => {
  return (
    <form
      method="get"
      action={action}
      className="flex items-center justify-between gap-1.5 relative w-full border max-w-2xl p-4 rounded-md h-15"
    >
      <div className="flex-1">
        <SearchCategories defaultValue={defaultCategory} />
      </div>
      <div className="flex-2">
        <input
          id="search-q"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Search medicine, medical products"
          className="h-14 w-full bg-transparent px-4 text-sm text-[#444] outline-none placeholder:text-[#7a7a7a]"
        />
      </div>
      <div className="bg-yellow-500 ml-10">
        <Button
          type="submit"
          className="h-15.25 w-15 cursor-pointer absolute -right-0.5 -bottom-0.5 rounded-md p-0"
        >
          <SearchIcon className="size-6" />
        </Button>
      </div>
    </form>
  );
};
