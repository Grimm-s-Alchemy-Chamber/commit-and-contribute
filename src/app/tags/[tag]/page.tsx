import Link from "next/link";
import PostCard from "@/components/site/PostCard";
import { postsByTag } from "@/lib/content";

export default async function TagDetailPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params;
  const decoded = decodeURIComponent(resolvedParams.tag);
  const posts = postsByTag(decoded);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Tag: {decoded}</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
      <div className="mt-6">
        <Link href="/tags" className="text-sm text-muted-foreground hover:underline">← All tags</Link>
      </div>
    </div>
  );
}