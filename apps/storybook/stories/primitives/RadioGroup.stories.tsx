import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/primitives/radio-group";
import { Label } from "@workspace/ui/components/label";

const meta = {
  title: "Primitives/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="small" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="small" id="small" />
        <Label htmlFor="small">Small</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="medium" id="medium" />
        <Label htmlFor="medium">Medium</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="large" id="large" />
        <Label htmlFor="large">Large</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="grid gap-4">
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="default" id="r1" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r1">Default</Label>
          <p className="text-sm text-muted-foreground">
            The default system font settings.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="comfortable" id="r2" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r2">Comfortable</Label>
          <p className="text-sm text-muted-foreground">
            More spacing and larger text for better readability.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <RadioGroupItem value="compact" id="r3" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="r3">Compact</Label>
          <p className="text-sm text-muted-foreground">
            Reduced spacing for more content on screen.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="d1" />
        <Label htmlFor="d1">Available</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="d2" disabled />
        <Label htmlFor="d2" className="opacity-50">
          Disabled
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="d3" />
        <Label htmlFor="d3">Available</Label>
      </div>
    </RadioGroup>
  ),
};

export const PaymentMethod: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="grid gap-4">
      <div className="flex items-center space-x-2 rounded-md border p-4">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card" className="flex-1 cursor-pointer">
          <div className="font-medium">Credit Card</div>
          <div className="text-sm text-muted-foreground">
            Pay with Visa, Mastercard, or American Express
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2 rounded-md border p-4">
        <RadioGroupItem value="paypal" id="paypal" />
        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
          <div className="font-medium">PayPal</div>
          <div className="text-sm text-muted-foreground">
            Pay with your PayPal account
          </div>
        </Label>
      </div>
      <div className="flex items-center space-x-2 rounded-md border p-4">
        <RadioGroupItem value="apple" id="apple" />
        <Label htmlFor="apple" className="flex-1 cursor-pointer">
          <div className="font-medium">Apple Pay</div>
          <div className="text-sm text-muted-foreground">
            Pay with Apple Pay on supported devices
          </div>
        </Label>
      </div>
    </RadioGroup>
  ),
};
