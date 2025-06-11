
export interface Creation {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category_id: string | null;
  category_name?: string;
  tags: string[];
  demo_url: string | null;
  github_url: string | null;
  download_url: string | null;
  status: 'draft' | 'published';
  views: number;
  rating: number;
  created_at: string;
  updated_at: string;
}
