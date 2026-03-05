import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCategoryIdBySlug } from "@/lib/categories";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const categorySlug = (searchParams.get("category") ?? "").trim() || "all";

  if (!q) return NextResponse.json({ data: [] });

  const supabase = await createClient();

  let categoryId: string | null = null;
  if (categorySlug !== "all") {
    categoryId = await getCategoryIdBySlug(categorySlug);
    if (!categoryId) return NextResponse.json({ data: [] });
  }

  let query = supabase
    .from("products")
    .select("id, name, image_url,slug")
    .ilike("name", `%${q}%`)
    .limit(8);

  if (categoryId) query = query.eq("category_id", categoryId);

  const { data } = await query;
  return NextResponse.json({ data: data ?? [] });
}
