import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getCartItemCount = cache(async (): Promise<number> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user for cart count:", userError.message);
    return 0;
  }

  if (!user) {
    return 0;
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (cartError) {
    console.error("Error fetching cart for count:", cartError.message);
    return 0;
  }

  if (!cart?.id) {
    return 0;
  }

  const { data: items, error: itemsError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("cart_id", cart.id);

  if (itemsError) {
    console.error("Error fetching cart items for count:", itemsError.message);
    return 0;
  }

  return (items ?? []).reduce((sum, item) => sum + (item.quantity ?? 0), 0);
});
