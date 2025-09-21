"use client";

import { mailchimp, CTA } from "@/resources";
import { Button, Heading, Text, Background, Column, Row } from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";

export const Mailchimp: React.FC<React.ComponentProps<typeof Column>> = ({ ...flex }) => {
  if (CTA.display === false) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor,
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {CTA.title}
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
          {CTA.description}
        </Text>
      </Column>

      {/* Replace form with call/mail buttons */}
      <Row gap="12" horizontal="center">
        <Button
          size="m"
          onClick={() => window.location.href = "tel:+9779766539310"}
        >
          Call Now
        </Button>
        <Button
          size="m"
          variant="secondary"
          onClick={() => window.location.href = "mailto:manishbhandari0444@gmail.com"}
        >
          Mail
        </Button>
      </Row>
    </Column>
  );
};
