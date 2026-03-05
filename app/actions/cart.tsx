"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function getOrCreateCartId(userId: string): Promise<string | null> {
  const supabase = await createClient();

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle();

  if (cartError) {
    console.error("Error fetching cart:", cartError.message);
    return null;
  }

  if (cart?.id) {
    return cart.id;
  }

  const { data: createdCart, error: createError } = await supabase
    .from("carts")
    .insert({ user_id: userId })
    .select("id")
    .single();

  if (createError) {
    console.error("Error creating cart:", createError.message);
    return null;
  }

  return createdCart.id;
}

export async function addProductToCart(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user for cart add:", userError.message);
    return;
  }

  if (!user) {
    redirect("/auth/login");
  }

  const cartId = await getOrCreateCartId(user.id);
  if (!cartId) return;

  const { data: existingItem, error: existingItemError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existingItemError) {
    console.error("Error fetching cart item:", existingItemError.message);
    return;
  }

  if (existingItem) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existingItem.quantity + 1 })
      .eq("id", existingItem.id);

    if (updateError) {
      console.error("Error updating cart item:", updateError.message);
      return;
    }
  } else {
    const { error: insertError } = await supabase.from("cart_items").insert({
      cart_id: cartId,
      product_id: productId,
      quantity: 1,
    });

    if (insertError) {
      console.error("Error inserting cart item:", insertError.message);
      return;
    }
  }

  revalidatePath("/cart");
}
