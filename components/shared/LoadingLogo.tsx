import Image from "next/image";
import React from "react";

type Props = {
  size?: number;
};

const LoadingLogo = ({ size = 60 }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={size}
        height={size}
        className="animate-pulse duration-1000"
      />
    </div>
  );
};

export default LoadingLogo;
