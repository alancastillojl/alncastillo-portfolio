"use client";

import { useState, type FormEvent } from "react";
import { trackContactLead } from "@/lib/gtag";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ contactEmail }: { contactEmail: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("request failed");

      setStatus("success");
      trackContactLead();
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-base">
        Thanks for reaching out — I&apos;ll get back to you as soon as
        possible.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
      <label className="flex flex-col gap-1 text-sm">
        Name
        <input
          name="name"
          type="text"
          required
          className="border-b border-foreground/20 bg-transparent py-2 text-base outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          name="email"
          type="email"
          required
          className="border-b border-foreground/20 bg-transparent py-2 text-base outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone (optional)
        <input
          name="phone"
          type="tel"
          className="border-b border-foreground/20 bg-transparent py-2 text-base outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="border-b border-foreground/20 bg-transparent py-2 text-base outline-none focus:border-foreground"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 w-fit self-center bg-foreground px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email me directly at{" "}
          {contactEmail}.
        </p>
      )}
    </form>
  );
}
