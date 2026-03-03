import { Heart, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { ProfileView } from "./profile";
import { Search } from "./search-bar/search";

export const Header = () => {
  return (
    <div className="container mx-auto flex flex-wrap items-center gap-4 p-4 py-6 md:justify-between">
      <div className="order-1">
        <Logo />
      </div>

      <div className="order-2 ml-auto flex items-center gap-4 lg:order-3 md:ml-0">
        <div>
          <Heart />
        </div>
        <div>
          <ShoppingBag />
        </div>
        <div>
          <ProfileView />
        </div>
      </div>

      <div className="order-3 basis-full self-center md:mx-auto md:max-w-2xl lg:order-2 lg:basis-auto lg:w-[42rem]">
        <Search />
      </div>
    </div>
  );
};
