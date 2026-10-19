import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { GitHubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { SiteNav } from "@/components/site-nav";
import { Uses } from "@/components/uses";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/content/projects";
import { tracks } from "@/content/tracks";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero tracks={tracks} />
      <WorkIndex projects={projects} />
      <GitHubSection />
      <About />
      <Uses />
      <Contact />
      <Footer />
    </>
  );
}
