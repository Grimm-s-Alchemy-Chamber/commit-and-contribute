import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthorBySlug, postsByAuthor } from "@/lib/content";
import PostCard from "@/components/site/PostCard";

// ✅ FIX: Type params as Promise<{ slug: string }>
export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  // ✅ FIX: Await the params Promise to get the actual value
  const resolvedParams = await params;
  const author = getAuthorBySlug(resolvedParams.slug);
  if (!author) return notFound();
  const posts = postsByAuthor(resolvedParams.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="flex items-start gap-4 mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={author.avatar || `https://source.unsplash.com/160x160/?portrait`} alt={author.name} className="h-20 w-20 rounded-full object-cover" />
        <div>
          <h1 className="text-2xl font-semibold">{author.name}</h1>
          <p className="text-muted-foreground">{author.bio}</p>
          <div className="mt-2 flex gap-3 text-sm text-muted-foreground">
            {author.social?.github && (
              <Link target="_blank" href={`https://github.com/${author.social.github}`} className="hover:underline">GitHub</Link>
            )}
            {author.social?.twitter && (
              <Link target="_blank" href={`https://twitter.com/${author.social.twitter}`} className="hover:underline">Twitter</Link>
            )}
            {author.social?.linkedin && (
              <Link target="_blank" href={`https://www.linkedin.com/in/${author.social.linkedin}`} className="hover:underline">LinkedIn</Link>
            )}
            {author.social?.website && (
              <Link target="_blank" href={author.social.website} className="hover:underline">Website</Link>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Posts by {author.name}</h2>
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
        <Link href="/authors" className="text-sm text-muted-foreground hover:underline">← All authors</Link>
      </div>
    </div>
  );
}