import { Logo } from "./logo";
import { Search } from "./search-bar/search";

export const Header = () => {
  return (
    <div className="container mx-auto flex items-center justify-between py-6">
      <Logo />

      <Search />

      <div>Right Side</div>
    </div>
  );
};
