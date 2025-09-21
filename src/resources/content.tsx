import { About, Blog, Home, CTA, Person, Social, Projects } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Manish",
  lastName: "Bhandari",
  name: `Manish Bhandari`,
  role: "Frontend Developer",
  avatar: "/images/avatar.jpg",
  email: "manishbhandari0444@gmail.com",
  location: "Asia/Kathmandu", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Nepali"], // optional: Leave the array empty if you don't want to display languages
};

const CTA: CTA = {
  display: true,
  title: <>Connect with {person.firstName}</>,
  description: <>Discuss frontend development, technology, and collaboration opportunities</>,

};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/manish0444",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/anytng",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Crafting seamless web & mobile experiences</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">React Expert</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          2+ Years Experience
        </Text>
      </Row>
    ),
    href: "/projects",
  },
  subline: (
    <>
      I'm Manish, a frontend developer specializing in React.js, Next.js, and React Native.
      <br /> Building responsive, scalable applications with focus on performance and user experience.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Kathmandu, Nepal`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/anytng",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Frontend Developer with 2+ years of experience specializing in React.js, Next.js, React Native, and Expo. 
        Strong background in building responsive, scalable, and user-friendly applications for web and mobile. 
        Skilled in Angular, .NET, and SQL Server Management Studio (SSMS) with a focus on performance optimization 
        and seamless UI/UX. Passionate about continuous learning, collaboration, and delivering impactful digital solutions.
      </>
    ),
  },
  projects: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "DTRG Network",
        timeframe: "September 2023 - Present",
        role: "Frontend Developer",
        achievements: [
          <>
            Developed and maintained responsive web applications using React.js and Next.js.
          </>,
          <>
            Built cross-platform mobile applications with React Native and Expo.
          </>,
          <>
            Collaborated with designers and backend teams to implement intuitive UI/UX.
          </>,
          <>
            Worked on integrating APIs and optimizing application performance.
          </>,
          <>
            Gained exposure to .NET backend systems and SSMS for database handling.
          </>,
          <>
            Contributed to ERP modules and internal dashboards, streamlining workflows.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>Expert in React.js, Next.js, Angular, HTML5, CSS3, JavaScript, and Bootstrap for building modern web applications.</>
        ),
        tags: [
          {
            name: "React.js",
            icon: "react",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Angular",
            icon: "angular",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
        ],
        images: [],
      },
      {
        title: "Mobile Development",
        description: (
          <>Specialized in React Native and Expo for cross-platform mobile application development.</>
        ),
        tags: [
          {
            name: "React Native",
            icon: "react",
          },
          {
            name: "Expo",
            icon: "expo",
          },
        ],
        images: [],
      },
      {
        title: "Backend & Database",
        description: (
          <>Experience with .NET backend systems and SQL Server Management Studio (SSMS) for database operations.</>
        ),
        tags: [
          {
            name: ".NET",
            icon: "dotnet",
          },
          {
            name: "SQL Server",
            icon: "database",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about frontend development...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const projects: Projects = {
  path: "/projects",
  label: "projects",
  title: `Projects – ${person.name}`,
  description: `Frontend development projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

// Gallery is removed

export { person, social, CTA, home, about, blog, projects };
