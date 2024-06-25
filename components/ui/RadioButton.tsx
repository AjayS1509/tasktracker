import React, { useState, ChangeEvent } from "react";

const RadioButton = ({
  selectedValue,
  setSelectedValue,
}: {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="flex gap-2">
      <div className="flex gap-2 border-2 border-grey-700 px-2 rounded-md cursor-pointer">
        <input
          type="radio"
          id="To Do"
          name="radioGroup"
          value="To Do"
          checked={selectedValue === "To Do"}
          onChange={handleRadioChange}
        />
        <label htmlFor="To Do">To Do</label>
      </div>
      <div className="flex gap-2 border-2 border-blue-400 px-2 rounded-md cursor-pointer">
        <input
          type="radio"
          id="In Progress"
          name="radioGroup"
          value="In Progress"
          checked={selectedValue === "In Progress"}
          onChange={handleRadioChange}
        />
        <label htmlFor="In Progress">In Progress</label>
      </div>
      <div className="flex gap-2 border-2 border-green-400 px-2 rounded-md cursor-pointer">
        <input
          type="radio"
          id="Done"
          name="radioGroup"
          value="Done"
          checked={selectedValue === "Done"}
          onChange={handleRadioChange}
        />
        <label htmlFor="Done">Done</label>
      </div>
    </div>
  );
};

export default RadioButton;
