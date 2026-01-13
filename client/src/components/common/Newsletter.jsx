import { Send } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Success! You're on the list.", {
      position: "top-center",
    });
  };

  return (
    <section className="bg-slate-900 px-4 py-16">
      <div className="container mx-auto max-w-4xl text-center text-white">
        {/* Header */}
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
          Subscribe to our Newsletter
        </h2>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-lg text-slate-400">
          Stay updated with our latest collections, exclusive offers, and
          insider news delivered straight to your inbox.
        </p>

        {/* Input & button form */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl flex-col gap-0 border border-slate-700 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="flex-grow bg-white px-6 py-4 text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-indigo-600 px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-indigo-700"
          >
            Subscribe Now <Send size={18} />
          </button>
        </form>

        <p className="mt-4 text-xs tracking-tighter text-slate-500 uppercase">
          No spam, we promise. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
