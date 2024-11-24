import React from "react";
import { Card } from "../../../../../components/ui/card";
import Link from "next/link";
import { ArrowLeft, CircleArrowLeft, Settings } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../components/ui/avatar";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";
import { cn } from "../../../../../lib/utils";

type Props = {
  imageUrl?: string;
  name: string;
  options?: { label: string; destructive: boolean; onClick: () => void }[];
};

const Header = ({ name, imageUrl, options }: Props) => {
  return (
    <Card className="w-full flex rounded-lg items-center p-2 justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          className="bg-primary-foreground rounded-full"
          variant="ghost"
          size="icon"
        >
          <Link href="/conversations" className="block lg:hidden">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{name}</h2>
      </div>
      <div className="flex gap-2">
        {options ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
              <Button size="icon" variant="secondary">
                <Settings />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6 mt-4">
              {options.map((options, id) => {
                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={options.onClick}
                    className={cn("font-semibold p-0", {
                      "text-destructive": options.destructive,
                    })}
                  >
                    <Button variant={"destructive"}>{options.label}</Button>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </Card>
  );
};

export default Header;
