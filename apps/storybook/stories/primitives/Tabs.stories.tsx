import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@workspace/ui/primitives/tabs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";

const meta = {
  title: "Primitives/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <h4 className="font-medium">Account</h4>
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@peduarte" />
          </div>
          <Button>Save changes</Button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <h4 className="font-medium">Password</h4>
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
          <Button>Save password</Button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Simple: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="p-4">
        <p className="text-sm text-muted-foreground">
          This is the overview tab content.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="p-4">
        <p className="text-sm text-muted-foreground">
          This is the analytics tab content.
        </p>
      </TabsContent>
      <TabsContent value="reports" className="p-4">
        <p className="text-sm text-muted-foreground">
          This is the reports tab content.
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4">
        <p className="text-sm text-muted-foreground">
          This is the notifications tab content.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="p-4">
        <p className="text-sm text-muted-foreground">Active tab content.</p>
      </TabsContent>
      <TabsContent value="another" className="p-4">
        <p className="text-sm text-muted-foreground">Another tab content.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">
          Tab 1
        </TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">
          Tab 3
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 border rounded-lg mt-2">
        <p>Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2" className="p-4 border rounded-lg mt-2">
        <p>Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3" className="p-4 border rounded-lg mt-2">
        <p>Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  ),
};

export const CardExample: Story = {
  render: () => (
    <Tabs defaultValue="music" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="music">Music</TabsTrigger>
        <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
      </TabsList>
      <TabsContent value="music">
        <div className="rounded-lg border p-4 space-y-3">
          <h4 className="font-semibold">Recently Played</h4>
          <div className="space-y-2">
            {["Song 1", "Song 2", "Song 3"].map((song) => (
              <div
                key={song}
                className="flex items-center gap-3 p-2 rounded hover:bg-muted"
              >
                <div className="h-10 w-10 rounded bg-muted" />
                <div>
                  <p className="text-sm font-medium">{song}</p>
                  <p className="text-xs text-muted-foreground">Artist Name</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="podcasts">
        <div className="rounded-lg border p-4 space-y-3">
          <h4 className="font-semibold">Your Podcasts</h4>
          <p className="text-sm text-muted-foreground">
            Your favorite podcasts will appear here.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="live">
        <div className="rounded-lg border p-4 space-y-3">
          <h4 className="font-semibold">Live Now</h4>
          <p className="text-sm text-muted-foreground">
            No live streams at the moment.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
