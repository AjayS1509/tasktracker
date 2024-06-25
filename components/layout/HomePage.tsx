"use client";
import React, { useEffect, useRef, useState } from "react";
import { HoverEffect } from "../ui/CardHoverEffect";
import { projects } from "@/data";
import Overlay from "../ui/Overlay";
import CardForm from "./CardForm";
import { title } from "process";
import Dropdown from "../ui/DropDown";

interface Item {
  title: string;
  description: string;
  link: string;
  status: string;
}

interface Itemupdate {
  title: string;
  description: string;
  link: string;
  status: string;
  idx: number;
}

const HomePage = () => {
  const [state, setState] = useState(projects);
  const originalData = useRef(projects);
  const [overlaycall, setOverlaycall] = useState(false);
  const [create, setCreate] = useState(false);
  const initialState: Itemupdate = {
    title: "",
    description: "",
    link: "",
    status: "To Do",
    idx: 0,
  };

  const [visiability, setVisability] = useState([initialState]);
  const [changeHappen, setChangeHappen] = useState(false);

  const handleClickDelete = (item: {
    title: string;
    description: string;
    link: string;
    status: string;
  }) => {
    const filterDelete = state.filter(
      (d) => !(d.title == item.title && d.description == item.description)
    );
    setState(filterDelete);
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
      link: item.link,
      status: item.status,
      idx: idx,
    };
    const updatedArray = [...visiability];
    updatedArray[0] = updatedItem;
    await setVisability(updatedArray);
    await setCreate(false);
    await setOverlaycall(true);
    // Update the entire visibility state with the selected item
  };

  const handleClickUpdateData = async (item: {
    title: string;
    description: string;
    link: string;
    status: string;
    idx: number;
  }) => {
    await setState((prevState) =>
      prevState.map((state, index) =>
        index === item.idx ? { ...state, ...item } : state
      )
    );
    await setOverlaycall(false);
    await setChangeHappen(true);
  };

  const handleCreateForm = () => {
    setVisability([initialState]);
    setCreate(true);
    setOverlaycall(true);
  };

  const handleCreateData = async (item: {
    title: string;
    description: string;
    link: string;
    status: string;
  }) => {
    await setState((prevState) => [...prevState, item]);
    await setOverlaycall(false);
    await setChangeHappen(true);
  };

  const options = [
    { value: "All", label: "All" },
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  const handleSelect = (value: string) => {
    if (value == "All") {
      //
      setState(originalData.current);
    } else {
      //
      const filterByValue = originalData.current.filter(
        (d) => d.status == value
      );
      setState(filterByValue);
    }
  };

  if (state.length == 0) {
    return null;
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
