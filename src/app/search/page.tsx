import PostCard from "@/components/site/PostCard";
import { searchPosts } from "@/lib/content";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const q = (Array.isArray(resolvedSearchParams.q) ? resolvedSearchParams.q[0] : resolvedSearchParams.q) ?? "";
  const results = q ? searchPosts(q) : [];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="text-muted-foreground">Search by title, description, tags, or author.</p>
        {q && (
          <p className="mt-2 text-sm text-muted-foreground">
            Showing {results.length} result{results.length === 1 ? "" : "s"} for "{q}".
          </p>
        )}
      </div>

      {q ? (
        results.length === 0 ? (
          <p className="text-muted-foreground">No results found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        )
      ) : (
        <p className="text-muted-foreground">Type a query in the search bar to begin.</p>
      )}
    </div>
  );
}