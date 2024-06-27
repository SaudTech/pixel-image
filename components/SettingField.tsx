import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

const SettingField = ({
  label,
  max,
  value,
  entireImage,
  onChange,
  onToggle,
}: {
  label: string;
  max: number;
  value: number;
  entireImage: boolean;
  onChange?: (value: number) => void;
  onToggle?: (checked: boolean) => void;
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleValueChange = (value: number[]) => {
    setInternalValue(value[0] / 100);
  };

  const handleValueCommit = () => {
    if (onChange) {
      onChange(internalValue);
    }
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggle) {
      onToggle(e.target.checked);
    }
  };

  return (
    <div className="w-full">
      <label>
        {label}: {internalValue.toFixed(1)}
      </label>
      <Slider
        defaultValue={[internalValue * 100]}
        max={max}
        step={1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      />
      <div className="mt-2">
        <label>
          <input
            type="checkbox"
            checked={entireImage}
            onChange={handleToggle}
          />
          {" "}Blur Entire Image
        </label>
      </div>
    </div>
  );
};

export default SettingField;