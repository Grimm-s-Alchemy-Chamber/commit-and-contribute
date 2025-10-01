import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, renderPostToHtml, slugify } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { ComponentSeparator } from "@/components/ui/component-separator";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const p = getPostBySlug(params.slug);
  if (!p) return notFound();
  const post = await renderPostToHtml(p);
  const authorSlug = slugify(post.data.author?.name || "");

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <h1 className="mb-2 text-4xl font-bold">{post.data.title}</h1>
      <p className="text-muted-foreground !mt-0">{post.data.description}</p>
      {post.data.cover ? (
        
        <img src={post.data.cover} alt="Cover" className="w-full rounded-lg shadow mt-4" />
      ) : null}
      <div className="mt-4 text-sm text-muted-foreground">
        By{" "}
        <Link href={`/authors/${authorSlug}`} className="hover:underline">
          {post.data.author?.name}
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {(post.data.tags || []).map((t) => (
          <Link key={t} href={`/tags/${encodeURIComponent(t)}`}>
            <Badge variant="secondary">{t}</Badge>
          </Link>
        ))}
      </div>
      <ComponentSeparator />
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html || "" }}
      />
    </div>
  );
}