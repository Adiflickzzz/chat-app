"use client";
import React, { useRef } from "react";
import { Card } from "../../../../../../components/ui/card";
import { z } from "zod";
import { useConversation } from "../../../../../../hooks/useConversation";
import { useMutationState } from "../../../../../../hooks/useMutationState";
import { api } from "../../../../../../convex/_generated/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../../../components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../../../../../../components/ui/button";
import { SendHorizonal } from "lucide-react";

const chatMessageSchema = z.object({
  content: z.string().min(1, {
    message: "This field cannot be empty",
  }),
});

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { conversationId } = useConversation();

  const { mutate: createMessage, pending } = useMutationState(
    api.message.create
  );

  const form = useForm<z.infer<typeof chatMessageSchema>>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleInputChange = (event: any) => {
    const { value, selectionStart } = event.target;

    if (selectionStart !== null) {
      form.setValue("content", value);
    }
  };

  const handleSubmit = async (value: z.infer<typeof chatMessageSchema>) => {
    createMessage({
      conversationId,
      type: "Text",
      content: [value.content],
    })
      .then(() => {
        form.reset();
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
    <div className="flex items-center gap-3">
      <Card className="w-full p-2 rounded-lg relative shadow-sm">
        <div className="flex gap-2 items-end w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex gap-2 items-end w-full"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="h-full w-full">
                    <FormControl>
                      <TextareaAutosize
                        onKeyDown={async (e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            await form.handleSubmit(handleSubmit)();
                          }
                        }}
                        rows={1}
                        maxRows={3}
                        {...field}
                        onChange={handleInputChange}
                        onClick={handleInputChange}
                        placeholder="Type a message ..."
                        className="min-h-full w-full resize-none border-0 outline-0 bg-card text-card-foreground placeholder:text-muted-foreground flex px-2 last:items-center no-scrollbar"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>{" "}
          </Form>
        </div>
      </Card>
      <Button
        disabled={pending}
        size="icon"
        onClick={form.handleSubmit(handleSubmit)}
        className="rounded-full shrink-0"
      >
        <SendHorizonal />
      </Button>
    </div>
  );
};

export default ChatInput;
