"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-black text-white">
      <Link href="/">Home</Link>
      <Link href="/code-review">Code Review</Link>
      <Link href="/image-generator">Image Generator</Link>
    </nav>
  );
}
