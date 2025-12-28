export type ProductRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  price_idr: number;
  duration_days: number;
  badge: string | null;
  image_path: string | null;
  image_url: string | null;
  description: string | null;
  features: string[];
  order_link: string | null;
  is_active: boolean;
  is_ready: boolean;
  updated_at: string;
  created_at: string;
};
