"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return alert("Please fill in all fields.");
    // In a real app, send to an API route. For now, just show a success state.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold">Thanks for reaching out! 🎉</h1>
        <p className="text-muted-foreground mt-2">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
          <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="How can we help?" rows={6} required />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full">Send message</Button>
        </div>
      </form>
    </div>
  );
}