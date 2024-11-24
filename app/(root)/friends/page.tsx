"use client";
import React from "react";
import ItemList from "../../../components/shared/item-list/ItemList";
import ConversationFallback from "../../../components/shared/conversation/ConversationFallback";
import AddFriendDailog from "./_components/AddFriendDailog";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/Request";

type Props = {};

const FriendsPage = (props: Props) => {
  const requests = useQuery(api.requests.get);

  return (
    <>
      <ItemList title="Friends" action={<AddFriendDailog />}>
        {requests ? (
          requests.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No friend requests found
            </p>
          ) : (
            requests.map((request) => {
              return (
                <Request
                  key={request.request.receiver}
                  id={request.request._id}
                  imageUrl={request.sender.imageUrl}
                  username={request.sender.username}
                  email={request.sender.email}
                />
              );
            })
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
          </div>
        )}
      </ItemList>
      <ConversationFallback />
    </>
  );
};

export default FriendsPage;
