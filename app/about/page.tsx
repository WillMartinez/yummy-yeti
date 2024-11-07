import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center max-w-2xl text-center">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-lg leading-relaxed">
          Welcome to our site. We are dedicated to creating amazing experiences
          and delivering value to our users. Our mission is to make technology
          accessible and enjoyable for everyone.
        </p>
        <Link
          href="/"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        >
          Go to Home Page
        </Link>
      </main>
    </div>
  );
}
