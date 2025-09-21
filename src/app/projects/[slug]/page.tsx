import { notFound } from "next/navigation";
import { getPosts, getProjectBySlugFromApi, convertApiProjectToPost, getProjectsFromApi, ApiProject } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, projects } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { Projects } from "@/components/projects/Projects";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // Try to get projects from API first, fallback to MDX files
  let projects = [];
  try {
    const apiProjects = await getProjectsFromApi();
    if (apiProjects.length > 0) {
      projects = apiProjects.map((project: ApiProject) => ({ slug: project.slug }));
    } else {
      const posts = getPosts(["src", "app", "projects", "projects"]);
      projects = posts.map((post) => ({ slug: post.slug }));
    }
  } catch (error) {
    const posts = getPosts(["src", "app", "projects", "projects"]);
    projects = posts.map((post) => ({ slug: post.slug }));
  }
  
  return projects;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  // Try to get project from API first
  let post;
  try {
    const apiProject = await getProjectBySlugFromApi(slugPath);
    if (apiProject) {
      post = convertApiProjectToPost(apiProject);
    } else {
      const posts = getPosts(["src", "app", "projects", "projects"]);
      post = posts.find((post) => post.slug === slugPath);
    }
  } catch (error) {
    const posts = getPosts(["src", "app", "projects", "projects"]);
    post = posts.find((post) => post.slug === slugPath);
  }

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${projects.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  // Try to get project from API first
  let post;
  try {
    const apiProject = await getProjectBySlugFromApi(slugPath);
    if (apiProject) {
      post = convertApiProjectToPost(apiProject);
    } else {
      const posts = getPosts(["src", "app", "projects", "projects"]);
      post = posts.find((post) => post.slug === slugPath);
    }
  } catch (error) {
    const posts = getPosts(["src", "app", "projects", "projects"]);
    post = posts.find((post) => post.slug === slugPath);
  }

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${projects.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/projects">
          <Text variant="label-strong-m">Projects</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        {/* Project Links */}
        {(post.metadata.live || post.metadata.github) && (
          <Row gap="16" marginTop="16">
            {post.metadata.live && (
              <Button
                href={post.metadata.live}
                suffixIcon="arrowUpRightFromSquare"
                variant="secondary"
                size="s"
              >
                View Live Project
              </Button>
            )}
            {post.metadata.github && (
              <Button
                href={post.metadata.github}
                suffixIcon="arrowUpRightFromSquare"
                variant="secondary"
                size="s"
              >
                View on GitHub
              </Button>
            )}
          </Row>
        )}
      </Column>
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          Related projects
        </Heading>
        <Projects exclude={[post.slug]} range={[2]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}