"use client";

import { useState } from "react";
import { HandHeart } from "lucide-react";

export default function DonationCard() {
  const [status, setStatus] = useState("idle");
  const [amount, setAmount] = useState("1000");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Anonymous",
          phone,
          amount: Number(amount),
          currency: "KES",
          method: "mpesa",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      id="give"
      className="rounded-3xl bg-secondary/25 border border-secondary/35 overflow-hidden"
    >
      <div className="p-6 sm:p-7">
        <p className="text-accent/90 text-xs font-black tracking-[0.25em] uppercase">
          Give
        </p>
        <h3 className="mt-3 text-2xl font-black leading-tight">
          Support the mission.
        </h3>
        <p className="mt-3 text-white/75">
          Your generosity helps us reach more lives with the Gospel.
        </p>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-white/60">
                Amount (KES)
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-primary/60"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1000"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white/60">Phone</label>
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-primary/60"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254…"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-white/60">
              Name (optional)
            </label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-primary/60"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-black font-extrabold px-6 py-3.5 hover:bg-accent transition-colors disabled:opacity-60"
          >
            <HandHeart className="size-5" />
            {status === "loading" ? "Submitting…" : "Give Now"}
          </button>

          {status === "success" ? (
            <p className="text-sm text-accent font-bold">
              Thank you! Your giving request was received.
            </p>
          ) : status === "error" ? (
            <p className="text-sm text-red-300 font-bold">
              Something went wrong. Please try again.
            </p>
          ) : (
            <p className="text-xs text-white/50">
              This demo stores donations via API; integrate payments when ready.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

