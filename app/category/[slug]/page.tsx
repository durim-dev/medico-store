import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getCategoryBySlug } from "@/lib/categories";
import { getActiveProductsByCategoryId } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getActiveProductsByCategoryId(category.id);

  return (
    <div className="px-2 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{category.name}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          {category.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length === 1 ? "" : "s"} available
        </p>
      </header>

      {products.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">
          No active products available in this category yet.
        </div>
      ) : (
        <section
          aria-label={`${category.name} products`}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}
