export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
                alt="Hacktoberfest community"
                className="w-full h-56 object-cover rounded-lg shadow mb-6"
            />
            <h1 className="text-3xl font-semibold tracking-tight">About this Project</h1>
            <p className="text-muted-foreground mt-2">
                This is a modern community blog platform built for Hacktoberfest 2025. It is powered by Next.js, TypeScript, and TailwindCSS.
                All content is stored locally in the repository under <code>content/</code> and contributed via GitHub Pull Requests.
            </p>
            <div className="prose dark:prose-invert max-w-none mt-6">
                <h2>Goals</h2>
                <ul>
                    <li>Encourage open source contributions during Hacktoberfest.</li>
                    <li>Showcase a simple, CMS-free content pipeline using Markdown and JSON.</li>
                    <li>Provide a clean, accessible, and responsive UI.</li>
                </ul>
                <h2>How it works</h2>
                <ol>
                    <li>Authors live in <code>content/authors</code> as JSON files.</li>
                    <li>Posts live in <code>content/posts</code> as Markdown with YAML frontmatter.</li>
                    <li>The site reads files at build/runtime and renders pages.</li>
                </ol>
                <p>
                    Want to contribute? Open an issue or submit a PR with a new post or author profile. Happy hacking!
                </p>
            </div>
        </div>
    );
}