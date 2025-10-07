import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeHighlight from "rehype-highlight"; // <-- Add this import
import rehypeRaw from "rehype-raw"; // <-- Add this import (optional, but recommended)
import rehypeStringify from "rehype-stringify"; // <-- Use this instead of remark-html
import remarkGfm from "remark-gfm";

export type PostFrontmatter = {
    title: string;
    description: string;
    tags: string[];
    author: { name: string; link?: string };
    social?: { github?: string; twitter?: string; linkedin?: string };
    date?: string;
    cover?: string;
};

export type Post = {
    slug: string;
    content: string; // raw md
    html?: string; // rendered
    data: PostFrontmatter;
};

export type Author = {
    slug: string;
    name: string;
    bio: string;
    social?: { github?: string; twitter?: string; linkedin?: string; website?: string };
    avatar?: string;
};

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "content", "posts");
const AUTHORS_DIR = path.join(ROOT, "content", "authors");

export function listPostSlugs(): string[] {
    if (!fs.existsSync(POSTS_DIR)) return [];
    return fs
        .readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map((f) => f.replace(/\.(md|mdx)$/i, ""));
}

export function getPostBySlug(slug: string): Post | null {
    const filePathMd = path.join(POSTS_DIR, `${slug}.md`);
    const filePathMdx = path.join(POSTS_DIR, `${slug}.mdx`);
    const filePath = fs.existsSync(filePathMd) ? filePathMd : fs.existsSync(filePathMdx) ? filePathMdx : null;
    if (!filePath) return null;
    const file = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(file);
    const fm = data as PostFrontmatter;
    return { slug, content, data: fm };
}

export async function renderPostToHtml(post: Post): Promise<Post> {
    const processed = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeHighlight) // <-- Add this plugin for syntax highlighting
        .use(rehypeStringify) // <-- Use this to convert to HTML string
        .process(post.content);
    return { ...post, html: processed.toString() };
}

export async function getAllPosts(): Promise<Post[]> {
    const slugs = listPostSlugs();
    const posts = slugs
        .map((s) => getPostBySlug(s))
        .filter(Boolean) as Post[];
    // Sort by date desc if present
    posts.sort((a, b) => {
        const da = a.data.date ? Date.parse(a.data.date) : 0;
        const db = b.data.date ? Date.parse(b.data.date) : 0;
        return db - da;
    });
    return posts;
}

export function listAuthors(): Author[] {
    if (!fs.existsSync(AUTHORS_DIR)) return [];
    return fs
        .readdirSync(AUTHORS_DIR)
        .filter((f) => f.endsWith(".json"))
        .map((f) => {
            const slug = f.replace(/\.json$/i, "");
            const raw = fs.readFileSync(path.join(AUTHORS_DIR, f), "utf8");
            const json = JSON.parse(raw);
            if (!json.avatar && json.social?.github) {
                json.avatar = `https://github.com/${json.social.github}.png`;
            }
            return { slug, ...json } as Author;
        });
}

export function getAuthorBySlug(slug: string): Author | null {
    const filePath = path.join(AUTHORS_DIR, `${slug}.json`);
    if (fs.existsSync(filePath)) {
        const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
        if (!json.avatar && json.social?.github) {
            json.avatar = `https://github.com/${json.social.github}.png`;
        }
        return { slug, ...json } as Author;
    }

    // Fallback: allow lookup by slugified author name (e.g., "sachin-patel")
    const authors = listAuthors();
    const target = slug.toLowerCase();
    const match = authors.find((a) => a.slug.toLowerCase() === target || slugify(a.name) === target);
    return match ?? null;
}

export function getAllTags(posts?: Post[]): string[] {
    const src = posts ?? listPostSlugs().map((s) => getPostBySlug(s)).filter(Boolean) as Post[];
    const set = new Set<string>();
    src.forEach((p) => (p.data.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function postsByAuthor(nameOrSlug: string): Post[] {
    const posts = listPostSlugs().map((s) => getPostBySlug(s)).filter(Boolean) as Post[];
    return posts.filter((p) => {
        const name = p.data.author?.name?.toLowerCase?.() || "";
        return name === nameOrSlug.toLowerCase() || name.replace(/\s+/g, "-") === nameOrSlug.toLowerCase();
    });
}

export function postsByTag(tag: string): Post[] {
    const posts = listPostSlugs().map((s) => getPostBySlug(s)).filter(Boolean) as Post[];
    const t = tag.toLowerCase();
    return posts.filter((p) => (p.data.tags || []).some((x) => x.toLowerCase() === t));
}

export function searchPosts(query: string): Post[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const authors = listAuthors();
    const posts = listPostSlugs().map((s) => getPostBySlug(s)).filter(Boolean) as Post[];
    return posts.filter((p) => {
        const hay = [
            p.data.title,
            p.data.description,
            ...(p.data.tags || []),
            p.data.author?.name,
        ]
            .filter(Boolean)
            .join("\n")
            .toLowerCase();
        // Also match by author profiles
        const authorMatch = authors.some((a) => a.name.toLowerCase().includes(q));
        return hay.includes(q) || authorMatch;
    });
}

export function slugify(input: string): string {
    return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}