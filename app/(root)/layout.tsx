import React from "react";
import SidebarWrapper from "../../components/shared/sidebar/SidebarWrapper";

type Props = { children: React.ReactNode };

const layout = ({ children }: Props) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default layout;
