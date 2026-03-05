import { Heart, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { ProfileView } from "./profile";
import { Search } from "./search-bar/search";
import Link from "next/link";
import { getCategories } from "@/lib/categories";
import { HeaderCategoryNav } from "./header-category-nav";

export const Header = async () => {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="container mx-auto mb-2.5 flex flex-wrap items-center gap-6 p-4 py-6 md:justify-between md:border-b pb-11">
        <div className="order-1">
          <Logo />
        </div>

        <div className="order-2 ml-auto flex items-center gap-4 lg:order-3 md:ml-0">
          <div>
            <Link href="/wishlist">
              <Heart />
            </Link>
          </div>
          <div>
            <Link href="/cart">
              <ShoppingBag />
            </Link>
          </div>
          <div>
            <ProfileView />
          </div>
        </div>

        <div className="order-3 basis-full self-center md:mx-auto md:max-w-2xl lg:order-2 lg:basis-auto lg:w-2xl">
          <Search />
        </div>
      </div>
      <HeaderCategoryNav categories={categories} />
    </header>
  );
};
