"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
// import { MoreHorizontalIcon } from "@/components/ui/Icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/code-review", label: "Code Review" },
  { href: "/image-generator", label: "Image Generator" },
] as const;

function NavLink({
  href,
  label,
  activeStyle,
}: {
  href: string;
  label: string;
  activeStyle: "home" | "codeReview" | "imageGen";
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  if (isActive && activeStyle === "home") {
    return (
      <Link
        href={href}
        className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        {label}
      </Link>
    );
  }

  if (isActive && activeStyle === "codeReview") {
    return (
      <Link
        href={href}
        className="rounded-lg border border-slate-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-slate-400"
      >
        {label}
      </Link>
    );
  }

  if (isActive && activeStyle === "imageGen") {
    return (
      <Link
        href={href}
        className="rounded-full border border-teal-400/80 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-teal-300"
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
    >
      {label}
    </Link>
  );
}

export function AppNavbar() {
  const pathname = usePathname();
  const isImageGen =
    pathname === "/image-generator" || pathname.startsWith("/image-generator/");

  const logoAccent = isImageGen ? "blue" : "teal";

  const activeStyleFor = (href: string) => {
    if (href === "/") return "home" as const;
    if (href === "/code-review") return "codeReview" as const;
    return "imageGen" as const;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0a0a0a]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo accent={logoAccent} />

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
          aria-label="Main"
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              activeStyle={activeStyleFor(item.href)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* <div
            className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-blue-500 text-sm font-semibold text-white"
            aria-hidden
          >
            U
          </div> */}
          {/* <button
            type="button"
            className="hidden rounded-lg border border-slate-600 bg-slate-900/80 p-2 text-white transition-colors hover:bg-slate-800 sm:flex"
            aria-label="More options"
          >
            <MoreHorizontalIcon className="size-4" />
          </button> */}
        </div>
      </div>

      <nav
        className="flex items-center justify-center gap-1 border-t border-slate-800/60 px-2 py-2 md:hidden"
        aria-label="Main mobile"
      >
        {navLinks.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            activeStyle={activeStyleFor(item.href)}
          />
        ))}
      </nav>
    </header>
  );
}
