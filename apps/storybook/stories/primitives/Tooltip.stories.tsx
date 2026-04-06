import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  SimpleTooltip,
} from "@workspace/ui/primitives/tooltip";
import { Button } from "@workspace/ui/components/button";

const meta: Meta<typeof Tooltip> = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Simple: Story = {
  render: () => (
    <SimpleTooltip content="Simple tooltip API">
      <Button>Simple Tooltip</Button>
    </SimpleTooltip>
  ),
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <SimpleTooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </SimpleTooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <SimpleTooltip content="Instant (0ms)" delayDuration={0}>
        <Button variant="outline">Instant</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Default (200ms)" delayDuration={200}>
        <Button variant="outline">Default</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Slow (500ms)" delayDuration={500}>
        <Button variant="outline">Slow</Button>
      </SimpleTooltip>
    </div>
  ),
};

export const LongContent: Story = {
  render: () => (
    <SimpleTooltip content="This is a much longer tooltip that demonstrates how the tooltip handles more text content. It will wrap to multiple lines.">
      <Button variant="outline">Long Content</Button>
    </SimpleTooltip>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">No Arrow</Button>
      </TooltipTrigger>
      <TooltipContent showArrow={false}>
        <p>Tooltip without arrow</p>
      </TooltipContent>
    </Tooltip>
  ),
};
