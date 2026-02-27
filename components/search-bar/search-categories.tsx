import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/app/actions/categories";

type SearchCategoriesProps = {
  defaultValue?: string;
};

export const SearchCategories = async ({}: SearchCategoriesProps) => {
  const categories = await getCategories();

  return (
    <Select name="category">
      <SelectTrigger className="w-full border-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:border-0 shadow-none">
        <SelectValue placeholder="All categories" />
      </SelectTrigger>
      <SelectContent position="popper" className="mt-3">
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
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
