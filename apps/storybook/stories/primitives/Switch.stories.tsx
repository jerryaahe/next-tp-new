import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "@workspace/ui/primitives/switch";
import { Label } from "@workspace/ui/components/label";

const meta = {
  title: "Primitives/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    defaultChecked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex items-start space-x-4 rounded-lg border p-4 w-[400px]">
      <Switch id="notifications" defaultChecked />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="notifications">Push Notifications</Label>
        <p className="text-sm text-muted-foreground">
          Receive push notifications when someone mentions you.
        </p>
      </div>
    </div>
  ),
};

export const SettingsForm: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border p-4">
      <h4 className="font-medium">Notification Settings</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Marketing emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products and features.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Security emails</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about your account security.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Product updates</Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about product updates.
            </p>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="opacity-50">Beta features</Label>
            <p className="text-sm text-muted-foreground opacity-50">
              Try out new features before they're released.
            </p>
          </div>
          <Switch disabled />
        </div>
      </div>
    </div>
  ),
};

export const InlineToggle: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="wifi" defaultChecked />
        <Label htmlFor="wifi">Wi-Fi</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="bluetooth" />
        <Label htmlFor="bluetooth">Bluetooth</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="airdrop" />
        <Label htmlFor="airdrop">AirDrop</Label>
      </div>
    </div>
  ),
};
