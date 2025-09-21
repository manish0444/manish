import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/projects/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      
      {/* New Section 1: Skills Overview */}
      <Column fillWidth gap="24" marginBottom="l">
        <Row fillWidth paddingRight="64">
          <Line maxWidth={48} />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Technical Expertise
            </Heading>
          </Row>
          <Row flex={3} paddingX="20">
            <Column gap="16">
              <Text variant="body-default-l" onBackground="neutral-weak">
                Specialized in modern frontend technologies including React.js, Next.js, React Native, and Angular. 
                Experience with .NET backend systems and SQL Server for full-stack development.
              </Text>
              <Row wrap gap="8">
                <Badge background="brand-alpha-weak" paddingX="12" paddingY="4">
                  React.js
                </Badge>
                <Badge background="brand-alpha-weak" paddingX="12" paddingY="4">
                  Next.js
                </Badge>
                <Badge background="brand-alpha-weak" paddingX="12" paddingY="4">
                  React Native
                </Badge>
                <Badge background="brand-alpha-weak" paddingX="12" paddingY="4">
                  Angular
                </Badge>
              </Row>
            </Column>
          </Row>
        </Row>
        <Row fillWidth paddingLeft="64" horizontal="end">
          <Line maxWidth={48} />
        </Row>
      </Column>

      {/* New Section 2: Professional Experience */}
      <Column fillWidth gap="24" marginBottom="l">
        <Row fillWidth paddingRight="64">
          <Line maxWidth={48} />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Professional Journey
            </Heading>
          </Row>
          <Row flex={3} paddingX="20">
            <Column gap="16">
              <Text variant="heading-default-l" onBackground="brand-weak">
                Frontend Developer at DTRG Network
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                September 2023 - Present • Kathmandu, Nepal
              </Text>
              <Text variant="body-default-l" onBackground="neutral-weak">
                Developing responsive web applications with React.js and Next.js, building cross-platform 
                mobile apps with React Native, and collaborating on ERP modules and internal dashboards.
              </Text>
            </Column>
          </Row>
        </Row>
        <Row fillWidth paddingLeft="64" horizontal="end">
          <Line maxWidth={48} />
        </Row>
      </Column>

      {/* New Section 3: Open to Opportunities */}
      <Column fillWidth gap="24" marginBottom="l">
        <Row fillWidth paddingRight="64">
          <Line maxWidth={48} />
        </Row>
        <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
          <Row flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Let's Collaborate
            </Heading>
          </Row>
          <Row flex={3} paddingX="20">
            <Column gap="16">
              <Text variant="body-default-l" onBackground="neutral-weak">
                I'm passionate about continuous learning and exploring new frameworks. Open to collaboration, 
                freelance opportunities, and international projects.
              </Text>
              <Row gap="12">
                <Button 
                  href="/contact" 
                  variant="primary" 
                  size="m"
                  arrowIcon
                >
                  Get in Touch
                </Button>
                <Button 
                  href={`mailto:${person.email}`} 
                  variant="secondary" 
                  size="m"
                >
                  Send Email
                </Button>
              </Row>
            </Column>
          </Row>
        </Row>
        <Row fillWidth paddingLeft="64" horizontal="end">
          <Line maxWidth={48} />
        </Row>
      </Column>
      <Projects range={[2]} />
      <Mailchimp />
    </Column>
  );
}
