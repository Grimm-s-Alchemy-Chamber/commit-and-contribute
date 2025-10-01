import Link from "next/link";
import PostCard from "@/components/site/PostCard";
import { getAllPosts, getAllTags, listAuthors } from "@/lib/content";
import SpotlightCarousel from "@/components/site/SpotlightCarousel";

export default async function Home() {
  const [posts, tags, authors] = await Promise.all([
    getAllPosts(),
    getAllTags(),
    listAuthors(),
  ]);

  // Safely parse post dates to avoid runtime errors when date/frontmatter is missing
  const getDateMs = (p: any) => {
    const raw = p?.frontmatter?.date;
    const ms = raw ? new Date(raw).getTime() : 0;
    return Number.isFinite(ms) ? ms : 0;
  };

  // Resolve author avatar: prefer explicit avatar, then GitHub avatar if social.github is present
  const getAuthorAvatar = (author: any): string | undefined => {
    if (author?.avatar && typeof author.avatar === "string") return author.avatar;
    const gh = author?.social?.github as string | undefined;
    if (!gh) return undefined;
    // Accept forms: "username", "@username", "https://github.com/username", "https://github.com/username/"
    const trimmed = gh.trim();
    let username = trimmed.replace(/^@/, "");
    const match = username.match(/github\.com\/([^/?#]+)/i);
    if (match && match[1]) username = match[1];
    username = username.replace(/\/$/, "");
    if (!username) return undefined;
    return `https://github.com/${username}.png`;
  };

  const featured = [...posts]
    .sort((a, b) => getDateMs(b) - getDateMs(a))
    .slice(0, 4);

  const topTags = tags.slice(0, 8);
  const spotlight = authors;

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16 space-y-20">
      {/* Hero */}
      <section className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Your First Step into Open Source Starts Here.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This blog exists because contributors from around the world share their stories and knowledge.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#featured-posts"
              className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow hover:opacity-90"
            >
              Read Posts
            </Link>
            <a
              href="https://github.com/Grimm-s-Alchemy-Chamber/commit-and-contribute"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              Contribute on GitHub
            </a>
          </div>
          <div className="mt-8 text-sm text-muted-foreground">
            Posts and authors are contributed via GitHub. No external CMS. Open-source and community first.
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section id="featured-posts" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Posts</h2>
          <Link href="/blog" className="text-sm font-medium underline-offset-4 hover:underline">
            View All Posts
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Contributor Spotlight */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Contributor Spotlight</h3>
          <a
            href="https://github.com/Grimm-s-Alchemy-Chamber/commit-and-contribute/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            Join the Contributors
          </a>
        </div>
        <p className="text-muted-foreground">
          Made possible by our amazing contributors.
        </p>
        <SpotlightCarousel authors={spotlight} />
      </section>

      {/* Tag Highlights */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Explore by Tag</h3>
        <div className="flex flex-wrap gap-2">
          {topTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center rounded-full border px-3 py-1 text-sm hover:bg-accent"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      {/* About mini */}
      <section className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-xl font-semibold">About the Project</h3>
            <p className="mt-2 text-muted-foreground">
              This is a collaborative blog project built and maintained by the community. Every post is contributed through open-source collaboration. You can read, contribute, and be part of the growing knowledge base.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="rounded-xl border bg-card p-6 text-center shadow-sm">
        <h3 className="text-xl font-semibold">Have something to share?</h3>
        <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
          Contribute a post and become part of the community.
        </p>
        <a
          href="https://github.com/Grimm-s-Alchemy-Chamber/commit-and-contribute/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex h-10 items-center rounded-md bg-foreground px-6 text-sm font-medium text-background hover:opacity-90"
        >
          Contribute on GitHub
        </a>
      </section>

      {/* Simple Footer */}
      <footer className="border-t pt-8 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://github.com/Grimm-s-Alchemy-Chamber/commit-and-contribute" target="_blank" rel="noreferrer">GitHub Repo</a>
            <Link href="/">License</Link>
          </nav>
          <div>An open-source community project.</div>
        </div>
      </footer>
    </main>
  );
}