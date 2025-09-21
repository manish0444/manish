import {
  Column,
  Heading,
  Text,
  Button,
  Icon,
  Row,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { baseURL, person, social } from "@/resources";
import React from "react";

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Get in touch with ${person.name}, Frontend Developer from Kathmandu, Nepal`,
};

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default function Contact() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/about`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Column maxWidth="s" horizontal="center" align="center" gap="xl">
        {/* Hero Section */}
        <Column gap="m" align="center">
          <Heading variant="display-strong-l" wrap="balance">
            Let's Work Together
          </Heading>
          
          <Text variant="heading-default-l" onBackground="neutral-weak" wrap="balance" align="center">
            Ready to bring your next project to life? Let's discuss how we can collaborate.
          </Text>
        </Column>
        
        {/* Primary Contact Actions */}
        <Row gap="m" wrap align="center">
          <Button
            href={`mailto:${person.email}`}
            variant="primary"
            size="l"
            prefixIcon="email"
            arrowIcon
          >
            Send Email
          </Button>
          
          <Button
            href={`tel:+9779766539310`}
            variant="secondary"
            size="l"
            prefixIcon="phone"
          >
            Call Now
          </Button>
        </Row>
        
        {/* Contact Details */}
        <Column gap="l" fillWidth>
          <Row gap="m" vertical="center" align="center">
            <Icon name="email" onBackground="accent-weak" />
            <Text variant="body-default-l" onBackground="neutral-weak">
              {person.email}
            </Text>
          </Row>
          
          <Row gap="m" vertical="center" align="center">
            <Icon name="globe" onBackground="accent-weak" />
            <Text variant="body-default-l" onBackground="neutral-weak">
              Kathmandu, Nepal
            </Text>
          </Row>
        </Column>
        
        {/* Social Links */}
        {social.length > 0 && (
          <Column gap="m" align="center">
            <Text variant="body-strong-m" onBackground="neutral-weak">
              Connect with me
            </Text>
            
            <Row gap="s" wrap align="center">
              {social.map((item) =>
                item.link && (
                  <Button
                    key={item.name}
                    href={item.link}
                    prefixIcon={item.icon}
                    size="m"
                    variant="tertiary"
                    aria-label={item.name}
                  />
                )
              )}
            </Row>
          </Column>
        )}
        
        {/* Availability Status */}
        <Column gap="m" align="center" paddingTop="l">
          <Row gap="s" vertical="center">
            <Icon name="checkCircle" onBackground="success-weak" />
            <Text variant="body-strong-m" onBackground="success-weak">
              Available for new projects
            </Text>
          </Row>
          
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Open to freelance work, collaborations, and full-time opportunities
          </Text>
        </Column>
        
        {/* Response Time */}
        <Column gap="s" align="center" paddingTop="m">
          <Text variant="body-default-s" onBackground="neutral-weak" align="center">
            I typically respond within 24 hours
          </Text>
        </Column>
      </Column>
    </Column>
  );
}