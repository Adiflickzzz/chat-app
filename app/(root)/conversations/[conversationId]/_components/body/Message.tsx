import { format } from "date-fns";
import React from "react";
import { cn } from "../../../../../../lib/utils";
import { from } from "svix/dist/openapi/rxjsStub";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../components/ui/avatar";

type Props = {
  fromCurrentUser: boolean;
  senderName: string;
  senderImage: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
  type: string;
};

const Message = ({
  content,
  createdAt,
  fromCurrentUser,
  lastByUser,
  senderImage,
  senderName,
  type,
}: Props) => {
  const formatTime = (timeStamp: number) => {
    return format(timeStamp, "HH:mm");
  };
  return (
    <div className={cn("flex items-end", { "justify-end": fromCurrentUser })}>
      <div
        className={cn("flex flex-col w-full mx-2", {
          "order-1 items-end": fromCurrentUser,
          "order-2 items-start": !fromCurrentUser,
        })}
      >
        <div
          className={cn("px-4 py-2 rounded-lg max-w-[70%]", {
            "bg-primary text-primary-foreground": fromCurrentUser,
            "bg-secondary text-secondary-foreground": !fromCurrentUser,
            "rounded-br-none": !lastByUser && fromCurrentUser,
            "rounded-bl-none": !lastByUser && !fromCurrentUser,
          })}
        >
          <p className="text-wrap break-words whitespace-pre-wrap">{content}</p>
          <p
            className={cn("text-[8px] flex w-full", {
              "text-primary-foreground justify-end": fromCurrentUser,
              "text-secondary-foreground justify-start": !fromCurrentUser,
            })}
          >
            {formatTime(createdAt)}
          </p>
        </div>
      </div>
      <Avatar
        className={cn("realtive size-8", {
          "order-2": fromCurrentUser,
          "order-1": !fromCurrentUser,
          invisible: lastByUser,
        })}
      >
        <AvatarImage src={senderImage} />
        <AvatarFallback>{senderName.substring(0, 1)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Message;
