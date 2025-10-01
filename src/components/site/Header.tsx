"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
    const router = useRouter();
    const sp = useSearchParams();
    const [q, setQ] = useState("");

    useEffect(() => {
        setQ(sp.get("q") ?? "");
    }, [sp]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/search?q=${encodeURIComponent(q)}`);
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex h-16 items-center justify-between gap-3">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="font-semibold text-lg">Commit & Contribute</Link>
                        <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                            <Link href="/blog" className="hover:text-foreground">Blog</Link>
                            <Link href="/tags" className="hover:text-foreground">Tags</Link>
                            <Link href="/authors" className="hover:text-foreground">Authors</Link>
                            <Link href="/about" className="hover:text-foreground">About</Link>
                            <Link href="/contact" className="hover:text-foreground">Contact</Link>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2">
                        <form onSubmit={onSubmit} className="hidden sm:block">
                            <Input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search posts..."
                                className="w-64"
                                aria-label="Search posts"
                            />
                        </form>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}