import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim();
  const categorySlug = searchParams.get("category") ?? "all";

  if (!q) return NextResponse.json({ data: [] });

  const supabase = await createClient();

  let categoryId: string | null = null;
  if (categorySlug !== "all") {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .maybeSingle();

    if (!category) return NextResponse.json({ data: [] });
    categoryId = category.id;
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
