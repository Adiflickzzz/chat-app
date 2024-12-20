"use client";
import React from "react";
import { useConversation } from "../../../../../../hooks/useConversation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import Message from "./Message";


const Body = () => {
  const { conversationId } = useConversation();

  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });
  return (
    <div className="flex-1 flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(
        ({ message, senderUsername, senderImage, isCurrentUser }, index) => {
          const lastByUser =
            messages[index - 1]?.message.senderId ===
            messages[index].message.senderId;

          return (
            <Message
              key={message._id}
              fromCurrentUser={isCurrentUser}
              senderImage={senderImage}
              senderName={senderUsername}
              lastByUser={lastByUser}
              content={message.content}
              createdAt={message._creationTime}
            />
          );
        }
      )}
    </div>
  );
};

export default Body;
