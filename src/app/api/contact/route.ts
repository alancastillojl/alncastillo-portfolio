import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createContactLead } from "@/lib/notion";
import { siteConfig } from "@/lib/site-config";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Faltan campos requeridos." },
      { status: 400 },
    );
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  await Promise.allSettled([
    resend
      ? resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: siteConfig.email,
          replyTo: email,
          subject: `Nuevo contacto de ${name}`,
          text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || "—"}\n\n${message}`,
        })
      : Promise.resolve(),
    createContactLead({ name, email, phone, message }),
  ]);

  return NextResponse.json({ ok: true });
}
