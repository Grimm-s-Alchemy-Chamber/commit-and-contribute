import Link from "next/link";
import { getAllTags } from "@/lib/content";

export default function TagsPage() {
  const tags = getAllTags();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Browse Tags</h1>
      {tags.length === 0 ? (
        <p className="text-muted-foreground">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map((t) => (
            <li key={t}>
              <Link href={`/tags/${encodeURIComponent(t)}`} className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-accent">
                #{t}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}