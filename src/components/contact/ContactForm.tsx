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
        Gracias por escribir — te responderé lo antes posible.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-5">
      <label className="flex flex-col gap-1 text-sm">
        Nombre
        <input
          name="name"
          type="text"
          required
          className="border-b border-foreground/20 bg-transparent py-2 outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          name="email"
          type="email"
          required
          className="border-b border-foreground/20 bg-transparent py-2 outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Teléfono (opcional)
        <input
          name="phone"
          type="tel"
          className="border-b border-foreground/20 bg-transparent py-2 outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Mensaje
        <textarea
          name="message"
          required
          rows={4}
          className="border-b border-foreground/20 bg-transparent py-2 outline-none focus:border-foreground"
        />
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 w-fit bg-foreground px-6 py-3 text-sm font-bold text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {status === "loading" ? "Enviando…" : "Enviar"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Algo salió mal. Intenta de nuevo o escribe directo a {contactEmail}.
        </p>
      )}
    </form>
  );
}
