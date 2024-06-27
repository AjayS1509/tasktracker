"use client";
import React, { useEffect, useRef, useState } from "react";
import { HoverEffect } from "../ui/CardHoverEffect";
import { projects } from "@/data";
import Overlay from "../ui/Overlay";
import CardForm from "./CardForm";
import Dropdown from "../ui/DropDown";
import toast from "react-hot-toast";

interface Item {
  title: string;
  description: string;
  status: string;
}

interface ItemUpdate {
  title: string;
  description: string;
  status: string;
  idx: number;
}

interface ItemWithId extends Item {
  _id: string;
}

const HomePage: React.FC = () => {
  const [state, setState] = useState<ItemWithId[]>([]);
  const originalData = useRef<ItemWithId[]>([]);
  const [overlaycall, setOverlaycall] = useState(false);
  const [create, setCreate] = useState(false);
  const initialState: ItemUpdate = {
    title: "",
    description: "",
    status: "To Do",
    idx: 0,
  };
  const [visiability, setVisability] = useState<ItemUpdate[]>([initialState]);
  const [changeHappen, setChangeHappen] = useState(false);

  useEffect(() => {
    fetch("/api/task")
      .then((res) => res.json())
      .then((data: ItemWithId[]) => {
        setState(data);
        originalData.current = data;
      })
      .catch((error) => console.error("Error fetching data!", error));
  }, []);

  const handleClickDelete = async (item: Item) => {
    const filterDelete = state.filter(
      (d) => !(d.title === item.title && d.description === item.description)
    );

    const itemToDelete = state.find(
      (d) => d.title === item.title && d.description === item.description
    ) as ItemWithId;

    if (itemToDelete) {
      const deletepromise = new Promise<void>(async (resolve, reject) => {
        const response = await fetch(`/api/task?_id=${itemToDelete._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setState(filterDelete);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(deletepromise, {
        loading: "Deleting...",
        success: "Deleted Successfully",
        error: "Error",
      });
    }
  };

  useEffect(() => {
    if (changeHappen) {
      originalData.current = state;
      setChangeHappen(false);
    }
  }, [changeHappen, state]);

  const handleClickUpdate = async (item: Item, idx: number) => {
    const updatedItem = {
      ...visiability[0],
      title: item.title,
      description: item.description,
      status: item.status,
      idx: idx,
    };
    const updatedArray = [...visiability];
    updatedArray[0] = updatedItem;
    setVisability(updatedArray);
    setCreate(false);
    setOverlaycall(true);
  };

  const handleClickUpdateData = async (item: ItemUpdate) => {
    const itemToUpdate = state.find(
      (d, i) => d && i === item.idx
    ) as ItemWithId;

    itemToUpdate.title = item.title;
    itemToUpdate.description = item.description;
    itemToUpdate.status = item.status;

    const updatepromise = new Promise<void>(async (resolve, reject) => {
      const response = await fetch("/api/task", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToUpdate),
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    toast.promise(
      updatepromise.then((d) => {
        setState((prevState) =>
          prevState.map((state, index) =>
            index === item.idx ? { ...state, ...item } : state
          )
        );
        setOverlaycall(false);
        setChangeHappen(true);
      }),
      {
        loading: "Updating Task...",
        success: "Updated Successfully",
        error: "Error",
      }
    );
  };

  const handleCreateForm = () => {
    setVisability([initialState]);
    setCreate(true);
    setOverlaycall(true);
  };

  const handleCreateData = async (item: Item) => {
    try {
      const createpromise = new Promise<void>(async (resolve, reject) => {
        const response = await fetch("/api/task", {
          method: "POST",
          body: JSON.stringify(item),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error("Error creating item");
          reject();
        } else {
          const newItem = await response.json();
          setState((prevState) => [...prevState, newItem]);
          setOverlaycall(false);
          setChangeHappen(true);
          resolve();
        }
      });

      toast.promise(createpromise, {
        loading: "Creating Task",
        success: "Created Successfully",
        error: "Error",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const options = [
    { value: "All", label: "All" },
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  const handleSelect = (value: string) => {
    if (value === "All") {
      setState(originalData.current);
    } else {
      const filterByValue = originalData.current.filter(
        (d) => d.status === value
      );
      setState(filterByValue);
    }
  };

  if (state.length === 0) {
    return <h1>loading....</h1>;
  }

  return (
    <>
      <Overlay show={overlaycall} onClose={() => setOverlaycall(false)}>
        <CardForm
          items={visiability}
          handleClickUpdateData={handleClickUpdateData}
          handleCreateData={handleCreateData}
          create={create}
        />
      </Overlay>
      <div>
        <h2 className="text-center font-semibold text-2xl mb-8 text-white">
          Task Management System
        </h2>
        <div className="flex gap-8 items-center justify-evenly lg:justify-normal">
          <div className="flex gap-2">
            <h1 className="text-white font-semibold">Filter :</h1>
            <Dropdown options={options} onSelect={handleSelect} />
          </div>
          <button
            type="button"
            onClick={handleCreateForm}
            className="px-6 py-2 border border-blue-400 rounded-lg bg-blue-500"
          >
            Create
          </button>
        </div>
        <HoverEffect
          items={state}
          handleClickDelete={handleClickDelete}
          handleClickUpdate={handleClickUpdate}
        />
      </div>
    </>
  );
};

export default HomePage;
