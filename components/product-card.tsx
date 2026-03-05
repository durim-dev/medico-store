import Link from "next/link";
import type { Product } from "@/lib/product-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { addProductToCart } from "@/app/actions/cart";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function ProductCard({ product }: ProductCardProps) {
  const priceNumber =
    typeof product.price === "number" ? product.price : Number(product.price);
  const isOutOfStock = product.stock_quantity <= 0;
  const formattedPrice = currencyFormatter.format(
    Number.isNaN(priceNumber) ? 0 : priceNumber,
  );
  const addToCartAction = addProductToCart.bind(null, product.id);

  return (
    <Card
      className="gap-0 py-0 transition-shadow hover:shadow-sm"
      size="default"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-4/3 w-full p-3">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="gap-2">
        <CardAction>
          {isOutOfStock ? (
            <Badge variant="destructive">Out of stock</Badge>
          ) : (
            <Badge variant="default">In stock</Badge>
          )}
        </CardAction>
        <CardTitle className="text-sm font-semibold">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-primary"
          >
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-base font-semibold text-foreground">
          {formattedPrice}
        </CardDescription>

        {product.requires_prescription ? (
          <Badge variant="outline">Prescription required</Badge>
        ) : null}
      </CardHeader>

      <CardFooter>
        <form action={addToCartAction} className="w-full">
          <Button type="submit" className="w-full">
            Add To Cart
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
