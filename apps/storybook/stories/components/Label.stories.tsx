import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@workspace/ui/components/label";
import { Input } from "@workspace/ui/components/input";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Username",
  },
};

export const Required: Story = {
  args: {
    children: "Email",
    required: true,
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid gap-2 w-[300px]">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
};

export const RequiredWithInput: Story = {
  render: () => (
    <div className="grid gap-2 w-[300px]">
      <Label htmlFor="password" required>
        Password
      </Label>
      <Input id="password" type="password" placeholder="Enter your password" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-4 w-[300px]">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="John Doe" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="required-email" required>
          Email (Required)
        </Label>
        <Input id="required-email" type="email" placeholder="john@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="disabled">Disabled Field</Label>
        <Input id="disabled" disabled placeholder="Cannot edit" />
      </div>
    </div>
  ),
};
