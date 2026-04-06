import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea, ScrollBar } from "@workspace/ui/primitives/scroll-area";

const meta = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag} className="text-sm py-1">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <figure key={i} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <div className="h-32 w-48 bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Image {i + 1}</span>
              </div>
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by Photographer {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-72 w-72 rounded-md border">
      <div className="p-4" style={{ width: "500px" }}>
        <h4 className="mb-4 text-sm font-medium leading-none">
          Scrollable in both directions
        </h4>
        <div className="grid gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="flex gap-2 whitespace-nowrap">
              {Array.from({ length: 10 }).map((_, j) => (
                <div
                  key={j}
                  className="h-8 w-20 rounded bg-muted flex items-center justify-center text-xs"
                >
                  Cell {i},{j}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const WithContent: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Notifications</h4>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">Notification {i + 1}</p>
              <p className="text-sm text-muted-foreground">
                This is a notification message with some content.
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
