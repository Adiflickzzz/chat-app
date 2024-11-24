"use client";
import React from "react";
import { useNavigation } from "../../../../hooks/useNavigation";
import { Card } from "../../../ui/card";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";

export const DesktopNav = () => {
  const paths = useNavigation();
  return (
    <Card className="hidden lg:flex flex-col justify-between items-center h-full w-16 px-2 py-4">
      <nav>
        <ul className="relative flex flex-col items-center gap-4">
          {paths.map((path, id) => {
            return (
              <li key={id} className="">
                <Link href={path.href}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        size="icon"
                        variant={path?.active ? "default" : "ghost"}
                      >
                        {path.icon}
                      </Button>
                      {path.count ? (
                        <Badge className="absolute left-6 bottom-7 px-2 bg-red-600 hover:bg-red-600">
                          {path.count}
                        </Badge>
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent className="absolute mt-1.5 ml-6">
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <UserButton />
      </div>
    </Card>
  );
};
