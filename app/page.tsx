import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">AI Tools</h1>

      <div className="flex gap-6">
        <Link href="/code-review">
          <div className="p-6 border rounded cursor-pointer">
            AI Code Reviewer
          </div>
        </Link>

        <Link href="/image-generator">
          <div className="p-6 border rounded cursor-pointer">
            AI Image Generator
          </div>
        </Link>
      </div>
    </div>
  );
}
