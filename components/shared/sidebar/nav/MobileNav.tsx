"use client";
import React from "react";
import { useNavigation } from "../../../../hooks/useNavigation";
import { Card } from "../../../ui/card";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../../ui/tooltip";
import { Button } from "../../../ui/button";
import { useConversation } from "../../../../hooks/useConversation";
import { Badge } from "../../../ui/badge";

export const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex items-center">
          {paths.map((path, id) => {
            return (
              <li key={id} className="w-1/2 gap-2">
                <Link href={path.href} className="">
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <Button
                        variant={path?.active ? "default" : "ghost"}
                        className="w-[95%]"
                      >
                        {path.icon}
                      </Button>
                      {path.count ? (
                        <Badge className="absolute right-2 top-1 px-2 bg-red-600 hover:bg-red-600">
                          {path.count}
                        </Badge>
                      ) : null}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{path.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Card>
  );
};
