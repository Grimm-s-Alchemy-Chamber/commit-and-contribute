import Link from "next/link";
import { listAuthors, slugify } from "@/lib/content";

export default function AuthorsPage() {
  const authors = listAuthors();
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Authors</h1>
      {authors.length === 0 ? (
        <p className="text-muted-foreground">No authors yet.</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((a) => (
            <li key={a.slug} className="rounded-lg border p-4 hover:shadow-sm transition-shadow">
              <Link href={`/authors/${slugify(a.name)}`} className="flex items-center gap-3">
                
                <img src={a.avatar || `https://source.unsplash.com/80x80/?portrait`} alt={a.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{a.name}</div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{a.bio}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}