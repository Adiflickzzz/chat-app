import React from "react";
import { Card } from "../../ui/card";

const ConversationFallback = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground text-lg font-semibold">
      Select/start conversation to get started!
    </Card>
  );
};

export default ConversationFallback;