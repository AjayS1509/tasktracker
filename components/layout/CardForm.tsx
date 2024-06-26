import React, { useState, useEffect } from "react";
import RadioButton from "../ui/RadioButton";

interface Item {
  title: string;
  description: string;
  status: string;
  idx: number;
}

interface CardFormProps {
  items: Item[];
  className?: string;
  handleClickUpdateData?: (item: {
    title: string;
    description: string;
    status: string;
    idx: number;
  }) => void;
  handleCreateData?: (item: {
    title: string;
    description: string;
    status: string;
  }) => void;
  create?: boolean;
}

const CardForm: React.FC<CardFormProps> = ({
  items,
  className,
  handleClickUpdateData,
  handleCreateData,
  create = false,
}) => {
  const [visibility, setVisibility] = useState({
    title: items[0]?.title ?? "title",
    description: items[0]?.description ?? "description",
    status: items[0]?.status ?? "To Do",
    idx: items[0]?.idx ?? 0,
  });
  useEffect(() => {
    setVisibility({
      title: items[0]?.title ?? "title",
      description: items[0]?.description ?? "description",
      status: items[0]?.status ?? "To Do",
      idx: items[0]?.idx ?? 0,
    });
  }, [items]);

  const handleChangeValue = (status: string) => {
    setVisibility((prev) => ({ ...prev, ...{ status: status } }));
  };

  return (
    <div className={`${className} text-black lg:w-96 mt-4`}>
      {create ? (
        <span className="text-center font-semibold mb-4 flex justify-center">
          Create Data
        </span>
      ) : (
        <span className="text-center font-semibold mb-4 flex justify-center">
          Update Data
        </span>
      )}
      <form className="flex flex-col gap-4">
        <input
          className=""
          placeholder="title"
          type="text"
          value={visibility.title}
          onChange={(e) =>
            setVisibility({ ...visibility, title: e.target.value })
          }
        />
        <textarea
          className=" lg:h-32 h-24"
          placeholder="dsescription"
          value={visibility.description}
          onChange={(e) =>
            setVisibility({ ...visibility, description: e.target.value })
          }
        />
        <RadioButton
          selectedValue={visibility.status}
          setSelectedValue={handleChangeValue}
        />
        {create ? (
          <button
            className="px-6 py-2 border border-green-400 rounded-lg bg-green-500"
            type="button"
            onClick={() => handleCreateData && handleCreateData(visibility)}
          >
            Create
          </button>
        ) : (
          <button
            className="px-6 py-2 border border-green-400 rounded-lg bg-green-500"
            type="button"
            onClick={() =>
              handleClickUpdateData && handleClickUpdateData(visibility)
            }
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default CardForm;
