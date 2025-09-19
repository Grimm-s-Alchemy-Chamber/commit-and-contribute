"use client";
import { useMemo, useState } from "react";
import type { Post } from "@/types/content";
import PostCard from "./PostCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export type BlogBrowserProps = {
    posts: Post[];
    tags: string[];
};

export default function BlogBrowser({ posts, tags }: BlogBrowserProps) {
    const [query, setQuery] = useState("");
    const [tag, setTag] = useState<string>("all");
    const [author, setAuthor] = useState<string>("all");
    const [sort, setSort] = useState<string>("date_desc");

    const authors = useMemo(() => {
        const set = new Set<string>();
        posts.forEach((p) => {
            const n = p.data.author?.name?.trim();
            if (n) set.add(n);
        });
        return Array.from(set).sort((a, b) => a.localeCompare(b));
    }, [posts]);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        let list = posts.filter((p) => {
            const matchesQuery = q
                ? [p.data.title, p.data.description, ...(p.data.tags || []), p.data.author?.name]
                    .filter(Boolean)
                    .join("\n")
                    .toLowerCase()
                    .includes(q)
                : true;
            const matchesTag = tag === "all" ? true : (p.data.tags || []).some((t) => t.toLowerCase() === tag.toLowerCase());
            const matchesAuthor = author === "all" ? true : (p.data.author?.name || "") === author;
            return matchesQuery && matchesTag && matchesAuthor;
        });

        switch (sort) {
            case "date_asc":
                list.sort((a, b) => (Date.parse(a.data.date || "0") - Date.parse(b.data.date || "0")));
                break;
            case "title_asc":
                list.sort((a, b) => a.data.title.localeCompare(b.data.title));
                break;
            case "title_desc":
                list.sort((a, b) => b.data.title.localeCompare(a.data.title));
                break;
            case "date_desc":
            default:
                list.sort((a, b) => (Date.parse(b.data.date || "0") - Date.parse(a.data.date || "0")));
                break;
        }

        return list;
    }, [posts, query, tag, author, sort]);

    return (
        <div className="space-y-6">
            <div className="rounded-lg border bg-card p-4">
                <div className="grid gap-3 md:grid-cols-4 items-center">
                    <div className="md:col-span-2">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by title, description, tag, or author..."
                            aria-label="Search posts"
                        />
                    </div>
                    <Select value={tag} onValueChange={setTag}>
                        <SelectTrigger aria-label="Filter by tag">
                            <SelectValue placeholder="Filter by tag" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All tags</SelectItem>
                            {tags.map((t) => (
                                <SelectItem key={t} value={t}>
                                    {t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={author} onValueChange={setAuthor}>
                        <SelectTrigger aria-label="Filter by author">
                            <SelectValue placeholder="Filter by author" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All authors</SelectItem>
                            {authors.map((a) => (
                                <SelectItem key={a} value={a}>
                                    {a}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                    <Select value={sort} onValueChange={setSort}>
                        <SelectTrigger aria-label="Sort posts">
                            <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date_desc">Newest</SelectItem>
                            <SelectItem value="date_asc">Oldest</SelectItem>
                            <SelectItem value="title_asc">Title A–Z</SelectItem>
                            <SelectItem value="title_desc">Title Z–A</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="md:col-span-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>
                            Showing <span className="font-medium text-foreground">{filtered.length}</span> of {posts.length}
                        </span>
                        {tag !== "all" && (
                            <Badge variant="secondary">Tag: {tag}</Badge>
                        )}
                        {author !== "all" && (
                            <Badge variant="secondary">Author: {author}</Badge>
                        )}
                    </div>
                </div>
            </div>

            {filtered.length === 0 ? (
                <p className="text-muted-foreground">No posts found. Try adjusting your filters.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((p) => (
                        <PostCard key={p.slug} post={p} />
                    ))}
                </div>
            )}
        </div>
    );
}