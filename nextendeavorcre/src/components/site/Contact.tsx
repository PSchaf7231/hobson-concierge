import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone number is too short").max(30),
  message: z.string().trim().min(5, "Tell us a bit more").max(2000),
});

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);

    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please review the form");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks. Paul will get back to you within one business day.");
      e.currentTarget.reset();
    }, 700);
  }

  const field =
    "mt-3 w-full border border-ivory/25 bg-white/4 px-5 py-4 text-[15px] text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none transition-colors";

  return (
    <section id="contact" className="border-t border-ivory/10 bg-ink py-24 text-ivory lg:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="border-t border-ivory/10 pt-10 text-center">
          <p className="eyebrow text-gold">Contact</p>
          <h2 className="mt-5 font-display text-4xl leading-none text-ivory sm:text-6xl">
            Let&apos;s Talk. Paul Answers His Own Phone.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-[1.75] text-ivory/80 sm:text-[1.05rem]">
            Both sides of the business run by appointment. Tell us a little about
            what you are looking for and we will take it from there.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-14 max-w-4xl border border-ivory/14 bg-white/2 px-8 py-10 sm:px-12 sm:py-12"
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-gold">First Name</span>
              <input
                name="firstName"
                maxLength={80}
                autoComplete="given-name"
                className={field}
                required
              />
            </label>
            <label className="block">
              <span className="eyebrow text-gold">Last Name</span>
              <input
                name="lastName"
                maxLength={80}
                autoComplete="family-name"
                className={field}
                required
              />
            </label>
            <label className="block">
              <span className="eyebrow text-gold">Email Address</span>
              <input
                type="email"
                name="email"
                maxLength={255}
                autoComplete="email"
                className={field}
                required
              />
            </label>
            <label className="block">
              <span className="eyebrow text-gold">Phone Number</span>
              <input
                type="tel"
                name="phone"
                maxLength={30}
                autoComplete="tel"
                className={field}
                required
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="eyebrow text-gold">Message</span>
              <textarea
                name="message"
                rows={6}
                maxLength={2000}
                className={field}
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-10 inline-flex w-full items-center justify-center bg-gold px-8 py-4 text-[11px] font-medium uppercase tracking-[0.28em] text-ink transition-all hover:bg-ivory disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Begin the Conversation"}
          </button>
        </form>
      </div>
    </section>
  );
}