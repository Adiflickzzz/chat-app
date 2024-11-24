"use client";
import React from "react";
import ItemList from "../../../components/shared/item-list/ItemList";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import DMConversationItem from "./_components/DMConversationItem";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

const ConversationLayout = ({ children }: Props) => {
  const router = useRouter();
  const conversations = useQuery(api.conversations.get);

  React.useEffect(() => {
    if (conversations && conversations.length === 0) {
      router.push("/conversations");
    }
  }, [conversations, router]);

  return (
    <>
      <ItemList title="Conversations">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No conversations found
            </p> 
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? null : (
                <DMConversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  username={conversations.otherMember?.username || ""}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
                  lastMessageContent={conversations.lastMessage?.content || ""}
                  lastMessageSender={conversations.lastMessage?.sender || ""}
                />
              );
            })
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center ">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationLayout;
