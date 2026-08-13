import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Client Portal · Next Endeavor CRE" },
      { name: "description", content: "Secure client login for Next Endeavor CRE and The Anasa Collection." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink text-ivory">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-20">
        <Link to="/" className="mb-10 text-center text-[11px] uppercase tracking-[0.32em] text-ivory/55 hover:text-gold">
          ← Return Home
        </Link>
        <h1 className="font-display text-3xl tracking-wide text-ivory sm:text-4xl">
          Client <span className="italic text-gold">Portal</span>
        </h1>
        <p className="mt-3 text-sm text-ivory/60">
          {mode === "signin" ? "Sign in to access private listings and documents." : "Request access to the private portal."}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.28em] text-ivory/55">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-b border-gold/40 bg-transparent py-2 text-ivory outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.28em] text-ivory/55">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-b border-gold/40 bg-transparent py-2 text-ivory outline-none focus:border-gold"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full border border-gold/70 bg-gold/10 px-6 py-3 font-display text-sm uppercase tracking-[0.28em] text-gold transition hover:bg-gold/20 disabled:opacity-50"
          >
            {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-6 text-center text-[11px] uppercase tracking-[0.28em] text-ivory/55 hover:text-gold"
        >
          {mode === "signin" ? "Need access? Request an account" : "Already have access? Sign in"}
        </button>
      </div>
    </main>
  );
}
