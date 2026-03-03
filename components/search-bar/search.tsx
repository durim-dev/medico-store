import { getCategories } from "@/app/actions/categories";
import { SearchClient } from "./search-client";

type SearchProps = {
  action?: string;
  defaultQuery?: string;
  defaultCategory?: string;
};

export const Search = async ({
  action = "/",
  defaultQuery = "",
  defaultCategory = "all",
}: SearchProps) => {
  const categories = await getCategories();

  return (
    <SearchClient
      action={action}
      defaultQuery={defaultQuery}
      defaultCategory={defaultCategory}
      categories={categories}
    />
  );
};
