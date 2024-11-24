"use client";
import React, { useState } from "react";
import ConversationContainer from "../../../../components/shared/conversation/ConversationContainer";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";
import Header from "./_components/Header";
import Body from "./_components/body/Body";
import ChatInput from "./_components/input/ChatInput";
import RemoveFriendDailog from "./_components/dailogs/RemoveFriendDailog";
import { useRouter } from "next/navigation";

type Props = { params: { conversationId: Id<"conversations"> } };

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const router = useRouter();
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const conversations = useQuery(api.conversations.get);

  const [removeFriendDailogOpen, setRemoveFriendDailogOpen] = useState(false);

  if (conversation === undefined) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (conversation === null) {
    return (
      <p className="w-full h-full flex items-center justify-center">
        Conversation not found
      </p>
    );
  }

  if (conversations?.length === 0) {
    router.push("/conversations");
  }

  return (
    <ConversationContainer>
      <RemoveFriendDailog
        conversationId={conversationId}
        open={removeFriendDailogOpen}
        setOpen={setRemoveFriendDailogOpen}
      />
      <Header
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMeber.username) || ""
        }
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMeber.imageUrl
        }
        options={
          conversation.isGroup
            ? [{
                label: "Remove",
                destructive: true,
                onClick: () => setRemoveFriendDailogOpen(true),
              }]
            : [{
                label: "Remove friend",
                destructive: true,
                onClick: () => setRemoveFriendDailogOpen(true),
              }]
        }
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPage;
