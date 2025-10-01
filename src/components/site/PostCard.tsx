"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { slugify } from "@/lib/slugify";
import type { Post } from "@/types/content";

export default function PostCard({ post }: { post: Post }) {
    const authorSlug = slugify(post.data.author?.name || "");
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
            {post.data.cover ? (
                
                <img
                    src={post.data.cover}
                    alt="Cover"
                    className="h-40 w-full object-cover"
                    loading="lazy"
                />
            ) : null}
            <CardHeader>
                <CardTitle className="text-lg">
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
                        {post.data.title}
                    </Link>
                </CardTitle>
                <CardDescription>{post.data.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                    {(post.data.tags || []).map((t) => (
                        <Link key={t} href={`/tags/${encodeURIComponent(t)}`}>
                            <Badge variant="secondary">{t}</Badge>
                        </Link>
                    ))}
                </div>
                {post.data.author?.name && (
                    <div className="text-sm text-muted-foreground">
                        By {" "}
                        <Link className="hover:underline" href={`/authors/${authorSlug}`}>
                            {post.data.author.name}
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}