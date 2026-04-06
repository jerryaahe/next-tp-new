import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster, toast } from "@workspace/ui/components/sonner";
import { Button } from "@workspace/ui/components/button";

const meta: Meta = {
  title: "Components/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster position="bottom-right" />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Button onClick={() => toast("This is a toast message")}>
      Show Toast
    </Button>
  ),
};

export const Success: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.success("Successfully saved!")}
    >
      Show Success
    </Button>
  ),
};

export const Error: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() => toast.error("Something went wrong!")}
    >
      Show Error
    </Button>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      With Description
    </Button>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event deleted", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
          },
        })
      }
    >
      With Action
    </Button>
  ),
};

export const PromiseToast: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => {
        const myPromise = new window.Promise<void>((resolve) => setTimeout(resolve, 2000));
        toast.promise(myPromise, {
          loading: "Loading...",
          success: "Data loaded successfully!",
          error: "Failed to load data",
        });
      }}
    >
      Promise Toast
    </Button>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("Default message")}>Default</Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Success message")}
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("Error message")}
      >
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Warning message")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("Info message")}>
        Info
      </Button>
    </div>
  ),
};
