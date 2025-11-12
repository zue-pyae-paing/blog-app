export interface Comment {
  _id: string;
  blogId: string;
  content: string;
  author: Author;
  createdAt: string;
}

export interface BlogComment {
  blogId: string | undefined;
  content: string;
}

export interface UpdateBlogComment {
  blogId: string | undefined;
  content: string;
  cmtId: string | undefined;
}
