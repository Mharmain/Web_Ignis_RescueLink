import Link from "next/link";
import AmbulanceIllustration from "@/components/ui/AmbulanceIllustration";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
      <div className="glass rounded-[28px] px-6 py-12">
        <AmbulanceIllustration className="mx-auto w-full max-w-sm" />
        <h1 className="h1 mt-6">This page took a wrong turn.</h1>
        <p className="lead mt-3">The page you are looking for does not exist. Let&rsquo;s get you back on the route.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/contact" className="btn btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
