// src/types.ts
export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    category?: string;
    tags?: string[];
    featuredImage?: string;
  }