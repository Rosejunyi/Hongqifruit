import Link from "next/link";

export default function HomeEN() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E8F5E9] via-white to-white">
        <div className="container py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#0F172A]">
                Hongqi Manufacture, Freshly Enjoy the Future
              </h1>
              <p className="mt-5 text-[#475569] text-lg leading-relaxed">
                Tech-enabled, safe fresh-cut expert with HACCP, smart factory, cold chain and traceability for B2B clients.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="#products" className="btn-primary">Products</Link>
                <Link href="#contact" className="btn-accent">Contact</Link>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--hongqi-green)]/15 via-white to-[var(--hongqi-blue)]/15 shadow-[var(--shadow-card)] grid place-items-center">
              <span className="text-[#64748B] text-sm">Video placeholder</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

