"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; name: string; image_url: string; slug: string };

export function SearchAutocompleteInput({
  defaultQuery = "",
  categorySelectId = "search-category",
}: {
  defaultQuery?: string;
  categorySelectId?: string;
}) {
  const [q, setQ] = useState(defaultQuery);
  const [items, setItems] = useState<Item[]>([]);
  const hasQuery = q.trim().length > 0;

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!hasQuery) return setItems([]);

      const category =
        (document.getElementById(categorySelectId) as HTMLSelectElement | null)
          ?.value ?? "all";

      const res = await fetch(
        `/api/products/suggest?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`,
      );
      const json = await res.json();
      setItems(json.data ?? []);
    }, 250);

    return () => clearTimeout(t);
  }, [q, categorySelectId, hasQuery]);

  console.log({ items });

  return (
    <div className="relative flex-1">
      <input
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search medicine, medical products"
        className="h-14 w-full bg-transparent px-4 pr-10 text-sm outline-none"
      />

      {hasQuery ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setQ("");
            setItems([]);
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="size-4" />
        </button>
      ) : null}

      {hasQuery ? (
        items.length === 0 ? (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md">
            <p className="px-3 py-2 text-sm text-gray-500">No results found</p>
          </div>
        ) : (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md">
            {items.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="flex items-center px-3 py-2 text-sm hover:bg-gray-100"
              >
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="size-6 rounded object-cover mr-2"
                />
                {p.name}
              </Link>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}
