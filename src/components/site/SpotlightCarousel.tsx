"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

interface Author {
    slug: string;
    name: string;
    avatar?: string;
    social?: { github?: string };
}

interface SpotlightCarouselProps {
    authors: Author[];
}

// Resolve author avatar: prefer explicit avatar, then GitHub avatar if social.github is present
function getAuthorAvatar(author: Author): string | undefined {
    if (author?.avatar && typeof author.avatar === "string") return author.avatar;
    const gh = author?.social?.github as string | undefined;
    if (!gh) return undefined;
    const trimmed = gh.trim();
    let username = trimmed.replace(/^@/, "");
    const match = username.match(/github\.com\/([^/?#]+)/i);
    if (match && match[1]) username = match[1];
    username = username.replace(/\/$/, "");
    if (!username) return undefined;
    return `https://github.com/${username}.png`;
}

export const SpotlightCarousel = ({ authors }: SpotlightCarouselProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    // Ensure stable refs length
    const items = useMemo(() => {
        if (authors.length > 8) return [...authors, ...authors];
        return authors;
    }, [authors]);

    // Scale items based on distance to center
    const updateScales = () => {
        const container = containerRef.current;
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;

        itemRefs.current.forEach((el) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(itemCenter - centerX);
            const maxDistance = containerRect.width / 2; // half-screen width
            const t = Math.min(distance / maxDistance, 1);
            const scale = 1.12 - 0.12 * t; // 1.12 when centered -> 1.0 at edges
            const opacity = 0.9 - 0.2 * t; // slightly dim towards edges
            el.style.transform = `scale(${scale})`;
            el.style.opacity = String(Math.max(0.7, opacity));
        });
    };

    useEffect(() => {
        updateScales();
        const onScroll = () => updateScales();
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("scroll", onScroll, { passive: true });
        const onResize = () => updateScales();
        window.addEventListener("resize", onResize);
        const id = requestAnimationFrame(updateScales);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(id);
        };
    }, [items.length]);

    // Auto-scroll logic with pause on hover and loop back to start
    // Scrolls one item at a time if there are more than 8 authors.
    useEffect(() => {
        const el = containerRef.current;
        // Only scroll if there are more items than can be displayed at once (we assume 8) and we have duplicated them
        if (!el || authors.length <= 8) return;

        let intervalId: ReturnType<typeof setInterval> | null = null;

        const scrollNext = () => {
            const firstItem = itemRefs.current[0];
            if (!firstItem || !el) return;

            // Calculate the width of one item plus the gap
            const itemWidth = firstItem.offsetWidth;
            const gap = parseInt(window.getComputedStyle(el).gap, 10) || 24; // gap-6 is 24px
            const scrollAmount = itemWidth + gap;

            // If we're about to scroll past the end of the original list, reset to the beginning
            const scrollBoundary = authors.length * scrollAmount;
            if (el.scrollLeft >= scrollBoundary - 1) {
                // -1 for safety
                // We are at the start of the duplicated list, silently jump to the actual start
                el.scrollTo({ left: 0, behavior: "instant" });
            }

            // Smoothly scroll to the next item
            el.scrollBy({ left: scrollAmount, behavior: "smooth" });
        };

        intervalId = setInterval(scrollNext, 3000); // Scroll every 3 seconds
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [authors, items.length]);

    return (
        <div className="relative">
            <div
                ref={containerRef}
                className="flex select-none gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {items.map((author, idx) => (
                    <Link
                        key={`${author.slug}-${idx}`}
                        href={`/authors/${author.slug}`}
                        ref={(el) => { itemRefs.current[idx] = el; }}
                        className="flex w-28 shrink-0 snap-start flex-col items-center rounded-lg p-2 transition-transform duration-200 will-change-transform hover:bg-accent"
                    >
                        <div className="h-20 w-20 overflow-hidden rounded-full bg-secondary shadow-sm">
                            {getAuthorAvatar(author) ? (
                                
                                <img
                                    src={getAuthorAvatar(author)!}
                                    alt={author.name}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-base font-medium">
                                    {author.name?.[0] ?? ""}
                                </div>
                            )}
                        </div>
                        <div className="mt-2 w-full truncate text-center text-sm font-medium">
                            {author.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpotlightCarousel;