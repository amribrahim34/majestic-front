// src/types/blog.ts

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  meta_title: string
  meta_description: string
  keywords: string
  img: string
  created_at: string
  updated_at: string
  tags: Tag[]
}

export interface BlogState {
  posts: BlogPost[]
  recentPosts: BlogPost[]
  currentPost: BlogPost | null
  loading: boolean
  error: string | null
}
