import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  github?: string;
  live?: string;
};

// API Project type to match the API response
export type ApiProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  summary: string;
  content: string;
  images: string[];
  github?: string;
  live?: string;
  publishedAt?: string;
  tag?: string;
  team?: Team[];
};

// Function to fetch projects from API
export async function getProjectsFromApi(): Promise<ApiProject[]> {
  try {
    // Replace with your actual API endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/projects';
    const response = await fetch(apiUrl, {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    const data = await response.json();
    
    if (data.success && Array.isArray(data.data)) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching projects from API:', error);
    return [];
  }
}

// Convert API project to the format expected by components
export function convertApiProjectToPost(project: ApiProject) {
  return {
    metadata: {
      title: project.title,
      publishedAt: project.publishedAt || new Date().toISOString(),
      summary: project.summary || project.description,
      image: project.images?.[0] || '',
      images: project.images || [],
      tag: project.tag || '',
      team: project.team || [],
      link: project.live || '',
      github: project.github || '',
      live: project.live || ''
    },
    slug: project.slug,
    content: project.content || ''
  };
}

// Function to fetch a single project by slug from API
export async function getProjectBySlugFromApi(slug: string): Promise<ApiProject | null> {
  try {
    const projects = await getProjectsFromApi();
    return projects.find(project => project.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching project by slug from API:', error);
    return null;
  }
}

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}
