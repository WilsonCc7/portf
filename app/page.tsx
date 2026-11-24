import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Cv } from "@/components/cv";
import { GitHubSection } from "@/components/github-section";
import { Hero } from "@/components/hero";
import { Uses } from "@/components/uses";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <WorkIndex projects={projects} />
      <About />
      <GitHubSection />
      <Uses />
      <Cv />
      <Contact />
    </>
  );
}
