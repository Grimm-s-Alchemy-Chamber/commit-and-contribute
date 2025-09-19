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