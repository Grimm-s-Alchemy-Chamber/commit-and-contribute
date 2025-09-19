"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        setMounted(true);
        const saved = (typeof window !== "undefined" && localStorage.getItem("theme")) as
            | "light"
            | "dark"
            | null;
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const next = saved ?? (prefersDark ? "dark" : "light");
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
    }, []);

    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        if (typeof window !== "undefined") localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    if (!mounted) return null;

    return (
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle} className="rounded-full">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
    );
}