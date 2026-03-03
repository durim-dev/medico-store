"use server";

import { createClient } from "@/lib/supabase/server";

export async function getWishlistItems() {
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getClaims();

  const user = userData?.claims;

  if (userError) {
    console.error("Error fetching user for wishlist:", userError.message);
    return [];
  }

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("wishlist")
    .select("products(id, name, slug, image_url)")
    .eq("user_id", user.id)
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching wishlist items:", error.message);
    return [];
  }

  return (data ?? [])
    .map((row) => row.products)
    .filter((product): product is NonNullable<typeof product> =>
      Boolean(product),
    );
}
