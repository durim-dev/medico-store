import { ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import { getWishlistItems } from "@/app/actions/wishlist";

export default async function Page() {
  const wishlistProducts = await getWishlistItems();

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-muted-foreground mb-6">
          Save your favorite products here by clicking the heart icon.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Wishlist</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
        My Wishlist ({wishlistProducts.length} item
        {wishlistProducts.length !== 1 ? "s" : ""})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))} */}
        Product Card
      </div>
    </div>
  );
}
