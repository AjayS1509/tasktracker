import React, { useState } from "react";

// Define the type for your dropdown options
interface Option {
  value: string;
  label: string;
}

// Define the props for the Dropdown component
interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <div>
      <select
        value={selectedValue}
        onChange={handleChange}
        className=" text-black rounded-md"
      >
        {/* <option value="" disabled>
          All
        </option> */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
