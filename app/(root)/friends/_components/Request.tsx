import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Card } from "../../../../components/ui/card";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Check, X } from "lucide-react";
import { useMutationState } from "../../../../hooks/useMutationState";
import { api } from "../../../../convex/_generated/api";
import { ConvexError } from "convex/values";
import { toast } from "sonner";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ email, id, imageUrl, username }: Props) => {
  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.deny
  );
  const { mutate: acceptRequest, pending: acceptRequestPending } =
    useMutationState(api.request.accept);

  return (
    <Card className="w-full flex flex-row lg:flex-col items-center lg:items-stretch justify-between p-2 gap-2 shadow-sm">
      <div className="flex items-center gap-4 truncate lg:mt-1">
        <Avatar>
          <AvatarImage src={imageUrl} />
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 lg:mt-1">
        <Button
          size="sm"
          onClick={() => {
            acceptRequest({ id })
              .then(() => {
                toast.success("Friend request accepted");
              })
              .catch((error) => {
                toast.error(
                  error instanceof ConvexError
                    ? error.data
                    : "Unexpected error occured"
                );
              });
          }}
          disabled={denyPending || acceptRequestPending}
          className="w-full"
        >
          <p>Accept</p>
          <Check />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => {
            denyRequest({ id })
              .then(() => {
                toast.success("Friend request denied");
              })
              .catch((error) => {
                toast.error(
                  error instanceof ConvexError
                    ? error.data
                    : "Unexpected error occured"
                );
              });
          }}
          className="w-full"
          disabled={denyPending || acceptRequestPending}
        >
          <p className="">Reject</p>
          <X />
        </Button>
      </div>
    </Card>
  );
};

export default Request;
