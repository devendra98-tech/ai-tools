import { CodeBracketsIcon, ImageMountainIcon } from "@/components/ui/Icons";
import { HomeFeatureCard } from "@/components/home/HomeFeatureCard";

export function HomeFeaturesSection() {
  return (
    <section className="border-t border-slate-200/80 bg-stone-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <HomeFeatureCard
          href="/code-review"
          title="AI Code Reviewer"
          description="Paste any code. Get instant feedback on bugs, style, and performance."
          tags={["JS", "Python", "TypeScript"]}
          tagClassName="bg-violet-100 text-violet-800"
          icon={
            <span className="flex size-full items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <CodeBracketsIcon className="size-6" />
            </span>
          }
        />
        <HomeFeatureCard
          href="/image-generator"
          title="AI Image Generator"
          description="Describe any image. Generate high-quality visuals in seconds with Gemini."
          tags={["Photorealistic", "Art", "Abstract"]}
          tagClassName="bg-teal-100 text-teal-800"
          icon={
            <span className="flex size-full items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <ImageMountainIcon className="size-6" />
            </span>
          }
        />
      </div>
    </section>
  );
}
