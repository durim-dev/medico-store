import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/product-types";

export const getActiveProductsByCategoryId = cache(
  async (categoryId: string): Promise<Product[]> => {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, slug, price, image_url, stock_quantity, requires_prescription",
      )
      .eq("category_id", categoryId)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products by category:", error.message);
      return [];
    }

    return data ?? [];
  },
);
