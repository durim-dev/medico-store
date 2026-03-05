"use server";

import { getCategories as getSharedCategories } from "@/lib/categories";

export async function getCategories() {
  return getSharedCategories();
}
