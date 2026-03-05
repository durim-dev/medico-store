import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/category-types";

export const getCategories = cache(async (): Promise<Category[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return (data ?? []).sort((a, b) => a.name.localeCompare(b.name));
});

export const getCategoryIdBySlug = cache(
  async (slug: string): Promise<string | null> => {
    const category = await getCategoryBySlug(slug);
    return category?.id ?? null;
  },
);

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching category by slug:", error.message);
      return null;
    }

    return data ?? null;
  },
);
