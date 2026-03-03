export const ALL_CATEGORY = "all";

export type SearchCategory = {
  id: string;
  name: string;
  slug: string;
};

type SearchParamsLike = {
  get(name: string): string | null;
};

export const resolveSearchState = ({
  searchParams,
  defaultQuery,
  defaultCategory,
}: {
  searchParams: SearchParamsLike;
  defaultQuery: string;
  defaultCategory: string;
}) => {
  const query = (searchParams.get("q") ?? defaultQuery).trim();
  const category =
    (searchParams.get("category") ?? defaultCategory).trim() || ALL_CATEGORY;

  return { query, category };
};
