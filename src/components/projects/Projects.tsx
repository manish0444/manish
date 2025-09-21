import { getPosts, getProjectsFromApi, convertApiProjectToPost } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
}

export async function Projects({ range, exclude }: ProjectsProps) {
  // Try to get projects from API first, fallback to MDX files
  let allProjects;
  
  try {
    const apiProjects = await getProjectsFromApi();
    if (apiProjects.length > 0) {
      // Convert API projects to the expected format
      allProjects = apiProjects.map(convertApiProjectToPost);
    } else {
      // Fallback to MDX files
      allProjects = getPosts(["src", "app", "projects", "projects"]);
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to MDX files
    allProjects = getPosts(["src", "app", "projects", "projects"]);
  }

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/projects/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || post.metadata.live || ""}
          github={post.metadata.github || ""}
        />
      ))}
    </Column>
  );
}
