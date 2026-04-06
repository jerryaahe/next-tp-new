import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "@workspace/ui/primitives/slider";
import { useState } from "react";

const meta = {
  title: "Primitives/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "object" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
  render: (args) => (
    <Slider key={JSON.stringify(args.defaultValue)} {...args} />
  ),
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
    className: "w-[300px]",
  },
  render: (args) => (
    <Slider key={JSON.stringify(args.defaultValue)} {...args} />
  ),
};

export const Steps: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 10,
    className: "w-[300px]",
  },
  render: (args) => (
    <Slider key={JSON.stringify(args.defaultValue)} {...args} />
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    disabled: true,
    className: "w-[300px]",
  },
  render: (args) => (
    <Slider key={JSON.stringify(args.defaultValue)} {...args} />
  ),
};

function ControlledSlider() {
  const [value, setValue] = useState<number[]>([33]);

  return (
    <div className="w-[300px] space-y-4">
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
      <p className="text-sm text-muted-foreground text-center">
        Value: {value[0]}
      </p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSlider />,
};

function WithLabelsSlider() {
  const [volume, setVolume] = useState([50]);
  const [brightness, setBrightness] = useState([75]);

  return (
    <div className="w-[300px] space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Volume</span>
          <span className="text-muted-foreground">{volume[0]}%</span>
        </div>
        <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Brightness</span>
          <span className="text-muted-foreground">{brightness[0]}%</span>
        </div>
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
}

export const WithLabels: Story = {
  render: () => <WithLabelsSlider />,
};

function TemperatureSlider() {
  const [temperature, setTemperature] = useState([22]);

  return (
    <div className="w-[300px] space-y-2">
      <div className="flex justify-between text-sm">
        <span>Temperature</span>
        <span className="text-muted-foreground">{temperature[0]}°C</span>
      </div>
      <Slider
        value={temperature}
        onValueChange={setTemperature}
        min={16}
        max={30}
        step={0.5}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>16°C</span>
        <span>30°C</span>
      </div>
    </div>
  );
}

export const Temperature: Story = {
  render: () => <TemperatureSlider />,
};

function PriceRangeSlider() {
  const [priceRange, setPriceRange] = useState([25, 75]);

  return (
    <div className="w-[300px] space-y-2">
      <div className="flex justify-between text-sm">
        <span>Price Range</span>
        <span className="text-muted-foreground">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      </div>
      <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        max={100}
        step={5}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$100</span>
      </div>
    </div>
  );
}

export const PriceRange: Story = {
  render: () => <PriceRangeSlider />,
};
