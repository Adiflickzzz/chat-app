"use client";
import React from "react";
import { Card } from "../../ui/card";
import { UserButton } from "@clerk/nextjs";
import { cn } from "../../../lib/utils";
import { useConversation } from "../../../hooks/useConversation";

type Props = {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
};

const ItemList = ({ children, title, action: Action }: Props) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn("hidden h-full w-full lg:flex-none lg:w-80 p-2", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className="mb-4 flex px-2 py-1 items-center justify-between">
        <h1 className="flex-1 text-xl font-bold tracking-tight">{title}</h1>
        <div className="lg:mr-0 mr-2">{Action ? Action : null}</div>
        <div className="lg:hidden flex">
          <UserButton />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
