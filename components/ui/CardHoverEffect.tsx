"use client";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
  handleClickDelete,
  handleClickUpdate,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    status: string;
  }[];
  className?: string;
  handleClickDelete?: (item: {
    title: string;
    description: string;
    link: string;
    status: string;
  }) => void;

  handleClickUpdate?: (
    item: {
      title: string;
      description: string;
      link: string;
      status: string;
    },
    idx: number
  ) => void;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.length == 0 && <div>None</div>}
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <div className=" line-clamp-4 h-40">
              <CardDescription>{item.description}</CardDescription>
            </div>
            <div
              className={`mb-4 text-white-400 tracking-wide leading-relaxed text-sm text-white flex gap-1`}
            >
              Status:{" "}
              <p
                className={
                  item.status == "To Do"
                    ? "text-yellow-300"
                    : item.status == "Done"
                    ? "text-green-500"
                    : "text-blue-500"
                }
              >
                {item.status}
              </p>
            </div>
            <div className="flex justify-between mx-3">
              <button
                type="button"
                className="px-6 py-2 border border-green-400 rounded-lg bg-green-500"
                onClick={() =>
                  handleClickUpdate && handleClickUpdate(item, idx)
                }
              >
                update
              </button>
              <button
                type="button"
                className="px-6 py-2 border border-red-400 rounded-lg bg-red-500"
                onClick={() => handleClickDelete && handleClickDelete(item)}
              >
                delete
              </button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
