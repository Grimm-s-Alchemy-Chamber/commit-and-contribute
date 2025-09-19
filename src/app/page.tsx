import Link from "next/link";

export default async function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Hacktoberfest Community Blog 2025
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A community-driven hub for tips, stories, and contributions throughout Hacktoberfest. Read posts, discover authors, and share your learnings via GitHub PRs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex h-10 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background shadow hover:opacity-90"
            >
              Read the Blog
            </Link>
            <Link
              href="/about"
              className="inline-flex h-10 items-center rounded-md border px-5 text-sm font-medium hover:bg-accent"
            >
              Learn More
            </Link>
            <a
              href="https://github.com/"
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
        <div className="relative">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-medium">What you'll find</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-foreground/70" /> Practical Next.js and OSS tips</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-foreground/70" /> Contributor stories and learnings</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-foreground/70" /> Tags, search, and filters to explore content</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-foreground/70" /> Minimal, responsive, dark-mode friendly UI</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}