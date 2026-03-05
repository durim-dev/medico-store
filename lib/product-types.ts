export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | string;
  image_url: string | null;
  stock_quantity: number;
  requires_prescription: boolean | null;
};
