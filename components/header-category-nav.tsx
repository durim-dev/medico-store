"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/category-types";

type HeaderCategoryNavProps = {
  categories: Category[];
};

export const HeaderCategoryNav = ({ categories }: HeaderCategoryNavProps) => {
  const pathname = usePathname();

  if (!categories.length) return null;

  return (
    <nav aria-label="Categories" className="container mx-auto overflow-x-auto">
      <ul className="flex min-w-max items-center gap-1 py-1.5">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;

          return (
            <li key={category.id}>
              <Link
                href={href}
                className={cn(
                  "inline-flex rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
                  isActive && "text-primary",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
