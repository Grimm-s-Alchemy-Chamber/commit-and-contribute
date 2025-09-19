import BlogBrowser from "@/components/site/BlogBrowser";
import { getAllPosts, getAllTags } from "@/lib/content";

export const metadata = {
  title: "Blog | Hacktoberfest Community Blog",
  description: "Browse community posts with filters, sorting, and search.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = getAllTags(posts);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="text-muted-foreground mt-1">Filter, sort, and search posts from our community.</p>
      </div>
      <BlogBrowser posts={posts} tags={tags} />
    </div>
  );
}