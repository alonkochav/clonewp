export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  categoryId?: number;
  tags?: string[];
  featuredImage?: string;
  created_at: Date;
  updated_at: Date;
  }