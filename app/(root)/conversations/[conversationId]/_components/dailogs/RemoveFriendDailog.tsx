"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useMutationState } from "../../../../../../hooks/useMutationState";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../../../components/ui/alert-dialog";
import { Button } from "../../../../../../components/ui/button";

type Props = {
  conversationId: Id<"conversations">;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const RemoveFriendDailog = ({ conversationId, open, setOpen }: Props) => {
  const { mutate: removeFriend, pending } = useMutationState(api.friend.remove);
  const handleRemoveFriend = async () => {
    removeFriend({ conversationId })
      .then(() => {
        toast.success("Friend removed");
      })
      .catch((error) => {
        toast.error(
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occurred"
        );
      });
  };
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is not reversable
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
          <Button variant="destructive" asChild>
            <AlertDialogAction disabled={pending} onClick={handleRemoveFriend}>
              Delete
            </AlertDialogAction>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveFriendDailog;
